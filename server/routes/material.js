// server/routes/material.js
const materialcontroller = require("./../controllers/material.ctrl");
const multipart = require("connect-multiparty");
const multipartWare = multipart();

module.exports = (router) => {
  /**
   * get files
   */
  router.route("/material/file/").post(materialcontroller.getFiles);

  /**
   * upload file
   */
  router
    .route("/material/file/upload")
    .post(multipartWare, materialcontroller.fileUpload);
  /**
   * delete file
   */
  router.route("/material/file/delete").delete(materialcontroller.deleteFile);
  /**
   * get all materials
   */
  router.route("/materials").get(materialcontroller.getMaterials);
  /**
   * get a particlular material to view
   */
  router.route("/material/:slug").get(materialcontroller.getMaterialSlug);
  // /**
  //  * get a particlular material to view
  //  */
  // router.route("/material/:id").get(materialcontroller.getMaterial);
  /**
   * add a material
   */
  router.route("/material").post(multipartWare, materialcontroller.addMaterial);
  /**
   * get search results
   */
  router.route("/search/:q").get(materialcontroller.getSearchResults);
  /**
   * get filter and search results
   */
  router.route("/search").get(materialcontroller.getFilterResults);
  /**
   * get all titles
   */
  router.route("/titles").get(materialcontroller.getTitles);
  /**
   * get author
   */
  router
    .route("/getUserMaterials/:author_id")
    .get(materialcontroller.getUserMaterials);

  /**
   * delete a material
   */
  router
    .route("/material/delete/:id")
    .delete(materialcontroller.deleteMaterial);

  /**
   * update a particlular material
   */
  router.route("/material/update/:id").put(materialcontroller.updateMaterial);
  /**
   * get distinct values from a field
   */
  router.route("/material/field/:field").get(materialcontroller.getDistinct);

  /**
   * get author likes
   */
  router
    .route("/materials/user/likes/:author_id")
    .get(materialcontroller.getUserLikes);
};
