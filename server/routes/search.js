const searchcontroller = require("./../controllers/search.ctrl");

module.exports = (router) => {
  /**
   * get search results
   */
  router.route("/getSearchQueries").get(searchcontroller.getSearchQueries);
  /**
   * save search results
   */
  router.route("/saveSearchQuery").post(searchcontroller.saveSearchQuery);
};
