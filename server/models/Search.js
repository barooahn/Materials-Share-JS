// server/models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SearchSchema = new Schema({
  search: {
    type: String
  }
});

module.exports = mongoose.model("Search", SearchSchema);
