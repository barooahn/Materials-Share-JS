import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
// import Viewer from "../Viewer/Viewer";
import Button from "@material-ui/core/Button";
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
const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  paper: {
    width: "95%",
    margin: "20px auto",
    padding: "15px"
  }
}));

export default ({
  title,
  setTitle,
  files,
  setFiles,
  localFiles,
  setLocalFiles,
  type
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const classes = useStyles();
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
    var fileNoPath = file.substring(
      "https://matshre-assets.s3.eu-west-2.amazonaws.com/".length
    );
    axios
      .delete("/api/material/file/delete", {
        data: { file: fileNoPath }
      })
      .then(res => {
        const removed = [...files].filter(x => x !== file);
        setFiles(removed);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  const handleDeleteLocal = file => {
    setLocalFiles(localFiles.filter(item => item.raw.name !== file.raw.name));
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" component={"span"}>
        {errorMsg}
      </Typography>
      <Typography variant="h5" component={"span"}>
        Step 1: Upload Media
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
        const reExtension = /(?:\.([^.]+))?$/;
        const ext = file.raw.name.match(reExtension)[1].toLowerCase();
        return (
          <div className="attachement" key={file.preview}>
            <Viewer file={file.preview} ext={ext} key={file.preview} />

            <Button
              color="secondary"
              onClick={() => handleDeleteLocal(file)}
              className={classes.button}
            >
              <Icon>delete_forever</Icon> Delete
            </Button>
          </div>
        );
      })}
      {/* ----------for existing files------------------  */}
      {
        (type =
          "Edit" &&
          files.map(file => {
            const reExtension = /(?:\.([^.]+))?$/;
            const ext = file.match(reExtension)[1].toLowerCase();
            return (
              <div className="attachement" key={file}>
                <Viewer file={file} ext={ext} key={file} />
                <Button
                  color="secondary"
                  onClick={() => handleDelete(file)}
                  className={classes.button}
                >
                  <Icon>delete_forever</Icon> Delete
                </Button>
                <br />
              </div>
            );
          }))
      }
      <br />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Select Media
        </Button>
      </label>
      <br />
      <br />
      {files || localFiles.length > 0 ? (
        <div>
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
        </div>
      ) : null}
      <br />
      {files.length > 0 || (localFiles.length > 0 && title.length > 3) ? (
        <Typography variant="h6" component={"span"}>
          Choose what to do now...
        </Typography>
      ) : null}
    </Paper>
  );
};
