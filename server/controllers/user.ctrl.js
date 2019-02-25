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
        password: password
      }
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
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },

  login: async (req, res, next) => {
    // Generate token
    const token = await signUser.signUser(req.user);
    res
      .status(200)
      .json({ message: "User logged In", token, id: req.user._id });
  },

  googleOAuth: async (req, res, next) => {
    // Generate token
    const token = signUser.signUser(req.user);
    console.log("google user", req.user);
    res
      .status(200)
      .json({ message: "User logged In With Google", token, id: req.user._id });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate token
    const token = signUser.signUser(req.user);
    console.log("facebook user", req.user._id);
    res.status(200).json({
      message: "User logged In With Facebook",
      token,
      id: req.user._id
    });
  },

  addUser: (req, res, next) => {
    new User(req.body).save((err, newUser) => {
      if (err) res.send(err);
      else if (!newUser) res.send(400);
      else res.send(newUser);
      next();
    });
  },

  getUser: (req, res, next) => {
    User.findById(req.params.id).then(
      /*populate('following').exec*/ (err, user) => {
        if (err) res.send(err);
        else if (!user) res.send(404);
        else res.send(user);
        next();
      }
    );
  },
  /**
   * user_to_follow_id, user_id
   */
  followUser: (req, res, next) => {
    User.findById(req.body.id)
      .then(user => {
        return user.follow(req.body.user_id).then(() => {
          return res.json({ msg: "followed" });
        });
      })
      .catch(next);
  },
  getUserProfile: (req, res, next) => {
    User.findById(req.params.id)
      .then(_user => {
        return User.find({ following: req.params.id }).then(_users => {
          _users.forEach(user_ => {
            _user.addFollower(user_);
          });
          return Material.find({ author: req.params.id }).then(_materials => {
            return res.json({ user: _user, materials: _materials });
          });
        });
      })
      .catch(err => console.log(err));
  }
}; // end
