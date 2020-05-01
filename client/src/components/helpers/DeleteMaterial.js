import {
  deleteRemoteFile,
  deleteMaterial,
  getMaterial
} from "../../actions/materials-share-actions";

const DeleteMaterial = async id => {
  console.log("In DeleteMAterial.js");
  if (id !== undefined) {
    console.log("In DeleteMAterial.js - id", id);
    //get material
    // fetch(`/api/material/${id}`, {
    //   method: "GET"
    // })
    //   .then(response => response.json())
    const material = await getMaterial(id);

    //remove files
    material.files.forEach(file => {
      var removeAmazon = file.split("/uploads").pop();
      removeAmazon = "uploads" + removeAmazon;

      let fileRemoved = deleteRemoteFile(removeAmazon);
      // fetch(`/api/material/file/delete`, {
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   method: "DELETE",
      //   body: JSON.stringify({ file: removeAmazon })
      // });
      console.log(" deleteMaterial - file removed", fileRemoved);
    });
    //delete Material
    // fetch(`/api/material/delete/${id}`, {
    //   headers: {
    //     "Content-Type": "application/json"
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   method: "DELETE"
    // })
    //   .then(response => response.json())
    let materialRemoved = deleteMaterial(id);
    console.log(" deleteMaterial - materialRemoved", materialRemoved);
  }
};

export default DeleteMaterial;
