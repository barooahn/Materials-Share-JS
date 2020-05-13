// server/routes/material.js
const materialcontroller = require("./../controllers/material.ctrl");
const multipart = require("connect-multiparty");
const multipartWare = multipart();

module.exports = (router) => {
  /**
   * get files
   */
  router.route("/material/file/").post(materialcontroller.getFiles);
  // /**
  //  * get file from path
  //  */
  // router
  //   .route("/material/getFileFromPath/")
  //   .post(materialcontroller.getFileFromPath);

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
   * get paginated materials
   */
  router.route("/materialsPaginated").get(materialcontroller.materialsPaginated);
  /**
   * get all materials
   */
  router.route("/materials").get(materialcontroller.getMaterials);
  /**
   * get a particlular material to view from slug
   */
  router.route("/material/:slug").get(materialcontroller.getMaterialSlug);
  /**
   * get a particlular material to viewfrom id
   */
  router.route("/materialId/:id").get(materialcontroller.getMaterialId);
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

  /**
   * get thumb from image
   */
  router
    .route("/material/makeThumb")
    .post(multipartWare, materialcontroller.makeThumb);
  /**
   * thumb upload
   */
  router.route("/material/thumbUpload").post(materialcontroller.thumbUpload);
};
