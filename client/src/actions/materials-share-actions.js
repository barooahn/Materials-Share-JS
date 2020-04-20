const axios = require("axios").default;

export const SaveData = (payload, type, setCompleted, setSaved) => {
  console.log("save ", payload);

  //get local files
  //save to AWS

  // if payload.files === null
  //delete payload.files;
  console.log(
    "ms share actions local files: ",
    Array.isArray(payload.localFiles)
  );
  if (Array.isArray(payload.localFiles) && payload.localFiles.length > 0) {
    handleUpload(payload.localFiles, payload, setCompleted, setSaved);
  } else {
    if (type == "Create") {
      console.log("Saving create material", payload);
      createMaterial(payload);
    }

    //save data to db
    if (type == "Edit") {
      console.log("Saving edit material", payload);
      editMaterial(payload);
    }
  }
  console.log("Materials-share.actions -finished saving ");
  return true;
  //route to my materials
};

const editMaterial = material => {
  console.log(
    "Material-share-actions - sending edit material to db...",
    material
  );
  axios
    .put(`/api/material/update/${material.id}`, material, {})
    .then(res => {
      console.log("saved to db", res.data);
    })
    .catch(function(err) {
      throw err;
    });
};

const createMaterial = material => {
  material.author_id = localStorage.getItem("USER_ID");
  axios
    .post(`/api/material`, material, {})
    .then(res => {
      console.log("saved to db", res.data);
    })
    .catch(function(err) {
      throw err;
    });
};

const handleUpload = (files, payload, setCompleted, setSaved) => {
  console.log("files in handle upload ", files);
  const data = new FormData();
  data.append("saveType", "awsUpload");
  files.forEach((file, index) => {
    // console.log("files raw: " + file.raw)
    data.append(`files[${index}]`, file.raw);
  });
  axios
    .post("/api/material/file/upload", data, {
      onUploadProgress: ProgressEvent => {
        setCompleted(oldCompleted => {
          if (oldCompleted === 100) {
            return 0;
          }
          const diff = (ProgressEvent.loaded / ProgressEvent.total) * 100;
          return Math.min(oldCompleted + diff, 100);
        });
      }
    })
    .then(res => {
      res.data.forEach(file => {
        // console.log("adding file to payload: ", file.path);
        payload.files.push(file.path);
        setSaved(true);
      });
      //remove from material
      delete payload.localFiles;

      if (payload.type == "Create") {
        delete payload.type;
        createMaterial(payload);
      }
      //if type is Create
      // api materials add

      //if type is Edit

      //save data to db
      if (payload.type == "Edit") {
        delete payload.type;
        // console.log("full payload", payload);

        editMaterial(payload);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
};
