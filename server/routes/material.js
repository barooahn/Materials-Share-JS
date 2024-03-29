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
	router
		.route("/material/file/delete")
		.delete(materialcontroller.deleteFile);

	/**
	 * get paginated materials
	 */
	router
		.route("/materialsPaginated")
		.get(materialcontroller.materialsPaginated);

	/**
	 * get paginated IB materials
	 */
	router
		.route("/materialsPaginatedIB")
		.get(materialcontroller.materialsPaginatedIB);

	/**
	 * get Autocomplete materials
	 */
	router.route("/materialsAutocomplete").get(materialcontroller.getDistinct);

	/**
	 * get all materials
	 */
	router.route("/materials").get(materialcontroller.getMaterials);

	/**
	 * get a particular material to view from slug
	 */
	router.route("/material/:slug").get(materialcontroller.getMaterialSlug);

	/**
	 * Get signed url
	 */
	router
		.route("/doesFileExist")
		.get(materialcontroller.getSignedUrlIfExists);
	/**
	 * get a particular material to view from id
	 */
	router.route("/materialId/:id").get(materialcontroller.getMaterialId);

	/**
	 * add a material
	 */
	router
		.route("/material")
		.post(multipartWare, materialcontroller.addMaterial);
	/**
	 * get search results
	 */
	router.route("/searchResults").post(materialcontroller.getSearchResults);
	/**
	 * get filter results
	 */
	router.route("/filterResults").post(materialcontroller.getFilterResults);
	/**
	 * get all titles
	 */
	router.route("/titles").get(materialcontroller.getTitles);
	/**
	 * get paginated materials
	 */
	router
		.route("/getUserMaterialsPaginated")
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
	router
		.route("/material/update/:id")
		.put(materialcontroller.updateMaterial);
	/**
	 * get distinct values from a field
	 */
	router.route("/material/field/:field").get(materialcontroller.getDistinct);

	/**
	 * get author likes
	 */
	router
		.route("/getlikedMaterialsPaginated")
		.get(materialcontroller.getUserLikes);
	/**
	 * get materialsAwaitingApproval materials
	 */
	router
		.route("/ ")
		.get(materialcontroller.getMaterialsAwaitingApproval);

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
