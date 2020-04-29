const searchcontroller = require("./../controllers/search.ctrl");

module.exports = router => {
  /**
   * get search results
   */
  router.route("/getSearchResults").get(searchcontroller.getSearchResults);
    /**
   * save search results
   */
  router.route("/saveSearchResults").post(searchcontroller.saveSearchResults);
};
