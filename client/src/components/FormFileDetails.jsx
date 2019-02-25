import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Icon, Paper, LinearProgress, FormHelperText } from "@material-ui/core";

class FormFileDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: []
    };
    this.props.values.loaded = 0;
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const {
      values,
      handleDelete,
      handleUpload,
      handleselectedFile
    } = this.props;

    const newSelectedFiles = values.selectedFiles.map(file => {
      return <li key={file.name}>{file.name}</li>;
    });

    const newFilePaths = values.filePaths.map(file => {
      return (
        <li key={file}>
          {file}
          <Icon
            className="delete-icon"
            onClick={() => handleDelete(file)}
            color="secondary"
          >
            delete_forever
          </Icon>
        </li>
      );
    });

    return (
      <React.Fragment>
        <Paper className="paperCenter" elevation={1}>
          <Typography variant="h5" component="h2">
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
            onChange={handleselectedFile}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">
              Select File(s)
            </Button>
          </label>

          <br />
          <br />
          {values.showUpload ? (
            <React.Fragment>
              <FormHelperText>Selected files</FormHelperText>

              <ul>{newSelectedFiles}</ul>

              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                // className={classes.button}
              >
                Upload
              </Button>

              <br />
              <br />
              <FormHelperText>Upload progress</FormHelperText>
              <br />
              <LinearProgress
                variant="determinate"
                value={Math.round(values.loaded, 2)}
              />

              <br />

              <FormHelperText>Uploaded files</FormHelperText>

              <ul>{newFilePaths}</ul>
            </React.Fragment>
          ) : null}
          {values.showContinue ? (
            <Button
              variant="contained"
              color="primary"
              className="contiune"
              onClick={this.continue}
            >
              Continue
            </Button>
          ) : null}
        </Paper>
      </React.Fragment>
    );
  }
}

export default FormFileDetails;
