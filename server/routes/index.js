// server/routes/index.js
const user = require("./user");
const material = require("./material");
const search = require("./search");

module.exports = router => {
  user(router);
  material(router);
  search(router);
};
