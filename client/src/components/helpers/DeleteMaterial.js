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
        var removeAmazon = file.split("/uploads").pop();
        removeAmazon = "uploads" + removeAmazon;
        let fileRemoved = deleteRemoteFile(removeAmazon);
      });

      let materialRemoved = deleteMaterial(id);
    } else {
    }
  }
};

export default DeleteMaterial;
