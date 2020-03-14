// server/routes/material.js
const materialcontroller = require("./../controllers/material.ctrl");
const multipart = require("connect-multiparty");
const multipartWare = multipart();

module.exports = router => {
	/**
	 * get files
	 */
	router.route("/material/file/").post(materialcontroller.getFiles);

	/**
	 * upload file
	 */
	router
		.route("/material/file/upload")
		.post(multipartWare, materialcontroller.uploadFile);
	/**
	 * delete file
	 */
	router.route("/material/file/delete").delete(materialcontroller.deleteFile);
	/**
	 * get all materials
	 */
	router.route("/materials").get(materialcontroller.getMaterials);
	/**
	 * get all liveMaterials
	 */
	router.route("/getLiveMaterials").post(materialcontroller.getLiveMaterials);

	/**
	 * add a material
	 */
	router
		.route("/materials/:author_id")
		.get(materialcontroller.getUserMaterials);
	/**
	 * add a material
	 */

	router
		.route("/material")
		.post(multipartWare, materialcontroller.addMaterial)

		/**
		 * delete a material
		 */
		.delete(multipartWare, materialcontroller.deleteMaterial);

	/**
	 * update a particlular material
	 */
	router.route("/material/update/:id").put(materialcontroller.updateMaterial);
	/**
	 * comment on a material
	 */
	router.route("/material/comment").post(materialcontroller.commentMaterial);
	/**
	 * get a particlular material to view
	 */
	router.route("/material/:id").get(materialcontroller.getMaterial);
	/**
	 * get distinct values from a field
	 */
	router.route("/material/field/:field").get(materialcontroller.getDistinct);
};
