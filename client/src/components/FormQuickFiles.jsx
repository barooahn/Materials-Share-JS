import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Paper, TextField } from "@material-ui/core";
import Viewer from "./Viewer/Viewer";

export class FormQuickFiles extends Component {
  constructor(props) {
    super(props);
    this.props.values.showContinue = false;
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  continueButton() {
    if (this.props.values.title !== "") {
      return (
        <React.Fragment>
          <Typography variant="h6" component="h4">
            I'm finished for now just save my resource.
          </Typography>
          <Typography variant="body1">(You can continue later)</Typography>
          <Button
            variant="contained"
            color="primary"
            className="contiune"
            onClick={this.props.saveMin}
          >
            Save My Resource
          </Button>
          <Typography variant="h6" component="h4">
            I would like to add more details so I can share my resource
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="contiune"
            onClick={this.continue}
          >
            Add Resource Details
          </Button>
        </React.Fragment>
      );
    }
  }

  render() {
    const paperCenter = {
      width: "80%",
      margin: "20px auto",
      padding: "15px"
    };
    const { values, handleChange } = this.props;

    return (
      <React.Fragment>
        <Paper style={paperCenter} elevation={1}>
          <Typography variant="h5" component="h2">
            Check your uploads are correct and give your resource a title
          </Typography>
          <Typography variant="h6" component="h3">
            You can use the back button to change your uploads
          </Typography>
          <br />
          <div className="attachement">
            {values.filePaths.map(file => {
              return <Viewer file={file} key={file} />;
            })}
          </div>
          <br />
          <Typography variant="h6" component="h3">
            Give your resource a title
          </Typography>
          <TextField
            id="standard-name"
            label="Title"
            value={values.title}
            onChange={handleChange("title")}
            margin="normal"
            style={{ width: "100%" }}
          />
          <br />
          <Typography variant="h6" component="h3">
            Choose what to do now...
          </Typography>
          <Button variant="contained" color="secondary" onClick={this.back}>
            Back
          </Button>
          {this.continueButton()}
        </Paper>
      </React.Fragment>
    );
  }
}

export default FormQuickFiles;
