const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  signUser: (user) => {
    // console.log("signUser user", user);
    return jwt.sign(
      {
        iss: "MaterialsShare",
        sub: user.id,
        iat: new Date().getTime(),
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
  },
};
