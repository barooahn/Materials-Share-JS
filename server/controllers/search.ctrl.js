const Search = require("../models/Search");

module.exports = {
  getSearchQueries: (req, res) => {
    Search.find()
      .sort({ search: -1 })
      .exec((err, searchResults) => {
        if (searchResults) return res.send(searchResults);
        else if (err) return res.send(err);
        else return res.send(404);
      });
  },

  saveSearchQuery: (req, res) => {
    Search.findOneAndUpdate(
      { search: req.body.search },
      { $set: { search: req.body.search } },
      { upsert: true },
      function (err, query) {
        if (query) return res.send(query);
        else if (err) return res.send(err);
        else return res.sendStatus(404);
      }
    );
  },
};
