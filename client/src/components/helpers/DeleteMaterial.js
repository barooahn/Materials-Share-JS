import {
	deleteRemoteFile,
	deleteMaterial,
	getMaterialId,
} from "../../actions/materials-share-actions";

const DeleteMaterial = async (id) => {
	if (id !== undefined) {
		const material = await getMaterialId(id);

		if (material) {
			//remove files
			await material.files.forEach((file) => {
				let removeAmazon = file.split("/uploads").pop();
				removeAmazon = "uploads" + removeAmazon;
				deleteRemoteFile(removeAmazon);
			});

			deleteMaterial(id);
		}
	}
};

export default DeleteMaterial;
