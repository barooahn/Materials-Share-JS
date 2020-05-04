/** */
const User = require("../models/User");
const Material = require("../models/Material");
const signUser = require("../signUser");

module.exports = {
  registerUser: async (req, res, next) => {
    const { email, password } = req.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use" });
    }

    // Create a new user
    const newUser = new User({
      method: "local",
      local: {
        email: email,
        password: password,
      },
    });

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
    signUser.signUser(req.user);
    // res
    //   .status(200)
    //   .json({ message: "User logged In", token, id: req.user._id });
  },

  signUser: async (req, res, next) => {
    // Generate token
    const user = req.body.user;
    console.log("user ctrl- signUser - user", user);
    const token = signUser.signUser(user);

    // const userEmail = user.method + ".email";
    // const existingUser = await User.findOne({ [userEmail]: user.email });
    const existingUser = await User.findOne({ email: user.email });
    // let eUser = {};
    if (existingUser) {
      // if (existingUser.method === "facebook") {
      //   eUser = existingUser.facebook;
      // }
      // if (existingUser.method === "google") {
      //   eUser = existingUser.google;
      // }
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
        // [user.method]: {
        id: user.id,
        email: user.email,
        name: user.name,
        img: user.img,
        // },
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
}; // end
