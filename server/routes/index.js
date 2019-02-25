// server/routes/index.js
const user = require("./user");
const material = require("./material");
module.exports = router => {
  user(router);
  material(router);
};
