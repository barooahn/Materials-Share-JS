// server/routes/index.js
const user = require("./user");
const material = require("./material");
const search = require("./search");
const email = require("./email");

module.exports = router => {
  user(router);
  material(router);
  search(router);
  email(router);
};
