/** */
const User = require("../models/User");
const Material = require("../models/Material");
const signUser = require("../signUser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

module.exports = {
  registerUser: async (req, res, next) => {
    const { email, password, name } = req.body;

    // Check if there is a user with the same email
    console.log("user.ctrl - register user request", req.body);
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use" });
    }

    // Create a new user
    const newUser = new User({
      method: "local",
      name: name,
      email: email,
      password: password,
      img: "",
    });
    console.log("user.ctrl - register usernew user", newUser);
    await newUser.save();

    // Generate the token
    const token = signUser.signUser(newUser);
    // Respond with token
    res.status(200).json({ token });
  },

  deleteUser: (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then((result) => {
        res.status(200).json({
          message: "User deleted",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },

  login: (req, res, next) => {
    // Generate token
    const token = signUser.signUser(req.user);
    console.log("user ctrl- login - user token", token);
    res.status(200).json({ message: "User logged In", token, user: req.user });
  },

  signUser: async (req, res, next) => {
    // Generate token
    const user = req.body.user;
    console.log("user ctrl- signUser - user", user);
    const token = signUser.signUser(user);
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      res.status(200).json({
        message: `User ${existingUser.name} logged In with ${existingUser.method}`,
        token,
        id: existingUser.id,
        name: existingUser.name,
        img: existingUser.img,
      });
    } else {
      const newUser = new User({
        method: user.method,
        id:
          user.id ||
          Math.random().toString(36).slice(2) +
            Math.random().toString(36).slice(2),
        email: user.email,
        name: user.name,
        img: user.img,
      });

      await newUser.save();

      res.status(200).json({
        message: "User logged In with " + user.method,
        token,
        id: user.id,
        email: user.email,
        name: user.name,
        img: user.img,
      });
    }
  },

  addUser: (req, res, next) => {
    new User(req.body).save((err, newUser) => {
      if (err) res.send(err);
      else if (!newUser) res.send(400);
      else res.send(newUser);
      next();
    });
  },

  getUser: async (req, res, next) => {
    console.log("user.ctrl - getuser req.params.id", req.params.id);
    await User.find({ id: req.params.id }).exec((err, user) => {
      console.log("user.ctrl - getuser", user);
      if (user) return res.send(user);
      else if (err) return res.send(err);
      else return res.send(404);
    });
  },
  getAvatar: async (req, res, next) => {
    console.log("user.ctrl - getuser req.params.id", req.params.id);
    await User.find({ id: req.params.id })
      .select({ img: 1, _id: 0 })
      .exec((err, user) => {
        console.log("user.ctrl - getuser", user);
        if (user) return res.send(user);
        else if (err) return res.send(err);
        else return res.send(404);
      });
  },
  /**
   * user_to_follow_id, user_id
   */
  followUser: (req, res, next) => {
    User.findById(req.body.id)
      .then((user) => {
        return user.follow(req.body.user_id).then(() => {
          return res.json({ msg: "followed" });
        });
      })
      .catch(next);
  },
  getUserProfile: (req, res, next) => {
    User.findById(req.params.id)
      .then((_user) => {
        return User.find({ following: req.params.id }).then((_users) => {
          _users.forEach((user_) => {
            _user.addFollower(user_);
          });
          return Material.find({ author: req.params.id }).then((_materials) => {
            return res.json({ user: _user, materials: _materials });
          });
        });
      })
      .catch((err) => console.log(err));
  },

  forgotPassword: async (req, res, next) => {
    if (req.body.email === "") {
      res.status(400).send("email required");
    }
    console.error(req.body.email);

    const filter = {
      email: req.body.email,
    };
    const token = crypto.randomBytes(20).toString("hex");
    const update = {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000,
    };

    let updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (updatedUser === null) {
      console.error("email not in database");
      res.status(403).send("email not in db");
    } else {
      // const token = crypto.randomBytes(20).toString("hex");
      // user.resetPasswordToken = token;
      // user.resetPasswordExpires = Date.now() + 3600000;
      // user.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });
      // var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
      // console.log("user.ctrl - forgot password - url", fullUrl);

      const mailOptions = {
        from: "materialsshare@gmail.com",
        to: `${updatedUser.email}`,
        subject: "Link To Reset Password",
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
          `https://localhost:3000/reset/${token}\n\n` +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n",
      };

      console.log("sending mail");

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error("there was an error: ", err);
        } else {
          console.log("here is the res: ", response);
          res.status(200).json("recovery email sent");
        }
      });
    }
  },

  updatePasswordViaEmail: async (req, res, next) => {
    console.error(
      "User.ctrl updatePasswordViaEmail req.body.password",
      req.body.password
    );
    const filter = {
      email: req.body.email,
      resetPasswordToken: req.body.resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    };

    let user = await User.findOne(filter);

    console.error("User.ctrl updatePasswordViaEmail updatedUser", user);
    if (user == null) {
      console.error("password reset link is invalid or has expired");
      res.status(403).send("password reset link is invalid or has expired");
    } else if (user != null) {
      user.password = req.body.password;
      user.save();
      console.log("user exists in db");
      console.log("password updated");
      res.status(200).send({ message: "password updated" });
    } else {
      console.error("no user exists in db to update");
      res.status(401).json("no user exists in db to update");
    }
  },

  resetPassword: (req, res, next) => {
    const token = req.query.resetPasswordToken;
    console.error("User.ctrl resetpassword token", token);
    User.findOne({
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    }).then((user) => {
      if (user == null) {
        console.error("password reset link is invalid or has expired");
        res.status(403).send("password reset link is invalid or has expired");
      } else {
        res.status(200).send({
          email: user.email,
          message: "password reset link a-ok",
        });
      }
    });
  },
}; // end
