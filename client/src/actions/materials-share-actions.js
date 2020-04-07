import UploadFiles from "./uploadFiles";
// import { EditorAttachFile } from "material-ui/svg-icons";
const axios = require("axios").default;

export const saveData = payload => {
  // console.log("save ", payload);

  //get local files
  //save to AWS

  // if payload.files === null
  //delete payload.files;
  // console.log("ms share actions local files: ", payload.localFiles);
  if (!Array.isArray(payload.localFiles) && payload.localFiles.length > 0) {
    handleUpload(payload.localFiles, payload);
  } else {
    if (payload.type == "Create") {
      delete payload.type;
      console.log("Saving create material", payload);
      createMaterial(payload);
    }

    //save data to db
    if (payload.type == "Edit") {
      delete payload.type;
      console.log("Saving edit material", payload);
      // console.log("full payload", payload);

      editMaterial(payload);
    }
  }

  //route to my materials
};

const editMaterial = material => {
  material.author_id = localStorage.getItem("USER_ID");
  // console.log("sending edit material to db...", material);
  axios
    .put(`http://localhost:5000/api/material/update/${material.id}`, material, {
      //   onUploadProgress: ProgressEvent => {
      //     this.setState({
      //       loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
      //     })
      //   },
    })
    .then(res => {
      console.log("saved to db", res.data);
    })
    .catch(function(err) {
      throw err;
    });
};

const createMaterial = material => {
  material.author_id = localStorage.getItem("USER_ID");
  // console.log("sending create material to db...", material);
  axios
    .post(`http://localhost:5000/api/material`, material, {
      //   onUploadProgress: ProgressEvent => {
      //     this.setState({
      //       loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
      //     })
      //   },
    })
    .then(res => {
      console.log("saved to db", res.data);
    })
    .catch(function(err) {
      throw err;
    });
};

const handleUpload = (files, payload) => {
  // console.log("files in handle upload ", files);
  const data = new FormData();
  data.append("saveType", "awsUpload");
  files.forEach((file, index) => {
    // console.log("files raw: " + file.raw)
    data.append(`files[${index}]`, file.raw);
  });
  axios
    .post("http://localhost:5000/api/material/file/upload", data, {
      //   onUploadProgress: ProgressEvent => {
      //     this.setState({
      //       loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
      //     })
      //   },
    })
    .then(res => {
      res.data.forEach(file => {
        // console.log("adding file to payload: ", file.path);
        payload.files.push(file.path);
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