const Search = require("../models/Search");

module.exports = {
  getSearchResults: (req, res) => {
    Search.find()
      .sort({ search: -1 })
      .exec((err, searchResults) => {
        if (searchResults) return res.send(searchResults);
        else if (err) return res.send(err);
        else return res.send(404);
      });
  },

  saveSearchResults: (req, res) => {
    console.log("saving search backend... ", res.body);
    Search.findOneAndUpdate(
      { search: req.body.search },
      { $set: { search: req.body.search } },
      { upsert: true },
      function(err, search) {
        if (search) return res.send(search);
        else if (err) return res.send(err);
        else return res.send(404);
      }
    );
  }
};
