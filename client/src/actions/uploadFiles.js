import React from "react";
import axios from "axios";

const UploadFiles = files => {
  const data = new FormData();
  let filePaths = [];
  files.forEach((file, index) => {
    // console.log("in upload files - files: ", file.raw);

    filePaths.push({ [`file${index}`]: file.raw });
  });
  //   console.log("in upload files - data: ", filePaths);
  //   const data = new FormData();
  //   for (var i = 0; i < this.state.selectedFiles.length; i++) {
  //     let file = this.state.selectedFiles[i];
  //     Object.defineProperty(file, "name", {
  //       writable: true,
  //       value: file.name.toLowerCase()
  //     });
  //     data.append("files[" + i + "]", file);
  //   }
  axios
    .post("/api/material/file/upload", filePaths, {
      onUploadProgress: ProgressEvent => {
        // this.setState({
        //need to define setuploading and add to progress bar//////////////////////////
        // setUploading({
        //   loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
        // });
      }
    })
    .then(res => {
      console.log("it's an array", res.data);
      //   const paths = res.data.map(data => data.name);
      //   this.setState({
      //     filePaths: [...this.state.filePaths, ...paths],
      //     showContinue: true
      //   });
      return res.data;
    })
    .catch(function(err) {
      console.log(err);
    });
};
export default UploadFiles;
