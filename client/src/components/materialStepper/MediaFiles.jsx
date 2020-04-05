import React, { useState } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
// import Viewer from "../Viewer/Viewer";
import Button from "@material-ui/core/Button";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Viewer from "../Viewer/Viewer";

const allowedMimeTypes = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "audio/mpeg",
  "audio/x-wav",
  "audio/mp3",
  "image/jpeg",
  "image/gif",
  "image/png",
  "video/mp4",
  "video/webm",
  "video/ogg"
];

export default ({
  title,
  setTitle,
  files,
  setFiles,
  localFiles,
  setLocalFiles,
  type = "create"
}) => {
  const [errorMsg, setErrorMsg] = useState("");

  const changeTitle = e => {
    setTitle(e.target.value);
  };

  const handleChange = e => {
    //   //validate mime type
    // DisplayFiles(e.target.files);
    const reExtension = /(?:\.([^.]+))?$/;
    let files = Array.from(e.target.files);
    files.forEach(file => {
      const ext = file.name.match(reExtension)[1].toLowerCase();
      if (ext === "docx" || allowedMimeTypes.includes(file.type)) {
        setErrorMsg("");
        setLocalFiles(media => [
          ...media,
          { preview: URL.createObjectURL(file), raw: file }
        ]);
      } else {
        setErrorMsg("This file type is not currently supported");
      }
    });
  };

  const handleDelete = file => {
    axios
      .delete("http://localhost:5000/api/material/file/delete", {
        data: { file: file }
      })
      .then(res => {
        const removed = [...files].filter(x => x !== res.data.deleted);
        setFiles(removed);
        console.log("files after deleted", files);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  const paperCenter = {
    width: "95%",
    margin: "20px auto",
    padding: "15px"
  };

  return (
    <React.Fragment>
      <Paper style={paperCenter} elevation={1}>
        <Typography variant="h5" component={"span"}>
          {errorMsg}
        </Typography>
        <Typography variant="h5" component={"span"}>
          Click 'Select File(s)' button to choose one or more files to save
        </Typography>
        <br />
        <br />
        <input
          accept="image/*, audio/*, video/*, .pdf, .docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          id="contained-button-file"
          className="inputFile"
          multiple
          type="file"
          onChange={handleChange}
        />

        {/* ----------for new files------------------  */}
        {localFiles.map(file => {
          // console.log("Mediafiles.js new file ", file);
          const reExtension = /(?:\.([^.]+))?$/;
          const ext = file.raw.name.match(reExtension)[1].toLowerCase();
          return (
            <div className="attachement">
              <Viewer file={file.preview} ext={ext} key={file.preview} />
            </div>
          );
        })}

        {/* ----------for existing files------------------  */}
        {files.map(file => {
          // console.log("Mediafiles.js existing file ", file);
          const reExtension = /(?:\.([^.]+))?$/;
          const ext = file.match(reExtension)[1].toLowerCase();
          return (
            <div className="attachement">
              <Viewer file={file} ext={ext} key={file} />
            </div>
          );
        })}

        <br />
        <br />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            Select File(s)
          </Button>
        </label>
        <br />
        <br />
        <Typography variant="h6" component={"span"}>
          Give your resource a title
        </Typography>
        <TextField
          key="Give your resource a title"
          label="Give your resource a title"
          value={title}
          onChange={changeTitle}
          margin="normal"
          style={{ width: "100%" }}
        />
        <br />
        <Typography variant="h6" component={"span"}>
          Choose what to do now...
        </Typography>
      </Paper>
    </React.Fragment>
  );
};
