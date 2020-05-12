import {
  deleteRemoteFile,
  deleteMaterial,
  getMaterialId,
} from "../../actions/materials-share-actions";

const DeleteMaterial = async (id) => {
  // console.log("In DeleteMAterial.js");
  if (id !== undefined) {
    // console.log("In DeleteMAterial.js - id", id);
    //get material
    // fetch(`/api/material/${id}`, {
    //   method: "GET"
    // })
    //   .then(response => response.json())
    const material = await getMaterialId(id);

    if (material) {
      // console.log("In DeleteMAterial.js - material", material);
      //remove files
      await material.files.forEach((file) => {
        var removeAmazon = file.split("/uploads").pop();
        removeAmazon = "uploads" + removeAmazon;

        let fileRemoved = deleteRemoteFile(removeAmazon);

        // console.log(" deleteMaterial - file removed", fileRemoved);
      });

      let materialRemoved = deleteMaterial(id);
      // console.log(" deleteMaterial - materialRemoved", materialRemoved);
    } else {
      console.log("In DeleteMaterial.js - error cannot delete file");
    }
  }
};

export default DeleteMaterial;
