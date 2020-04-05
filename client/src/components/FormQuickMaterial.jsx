import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SelectBox from "./SelectBox";

class FormQuickMaterial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shared: true
    };
    this.props.values.shared = "true";
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

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
    this.props.handleSelectChange("shared", event.target.checked.toString());
  };

  continueButton() {
    const {
      objective,
      level,
      preparation,
      timeInClass,
      pupilTask
    } = this.props.values;
    if (
      objective !== "" &&
      level !== [] &&
      preparation !== 0 &&
      timeInClass !== 0 &&
      pupilTask !== []
    ) {
      return (
        <React.Fragment>
          <Typography variant="h5" component="h3">
            Choose what to do now...
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.shared}
                onChange={this.handleChange("shared")}
                value={this.state.shared.toString()}
              />
            }
            label="Share your resource"
          />
          <Typography variant="h6" component="h4">
            I'm finished for now just save my resource.
          </Typography>
          <Typography variant="body1">(You can continue later)</Typography>
          <Button
            variant="contained"
            color="primary"
            className="contiune"
            onClick={this.props.saveQuick}
          >
            Save My Resource
          </Button>
          <Typography variant="h6" component="h4">
            I would like to add all the information to make my resource of
            publishable standard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="contiune"
            onClick={this.continue}
          >
            Add Final Information
          </Button>
        </React.Fragment>
      );
    }
  }

  render() {
    const { values, handleChange, handleSelectChange } = this.props;

    // console.log("Level", getInputSelectOptions("level"));

    return (
      <Paper className="paperCenter" elevation={1}>
        <Typography variant="h5" component="h2">
          Enter the following to enable sharing of your resource
        </Typography>
        <Typography variant="subtitle2">
          Note: you can opt to keep your resource private
        </Typography>
        <Typography variant="subtitle2">
          (back button to change title and uploads)
        </Typography>
        <br />
        <TextField
          id="objective"
          label="Objective of the resource"
          value={values.objective}
          placeholder="By the end of the activity pupils will be able to:"
          onChange={handleChange("objective")}
          multiline
          margin="normal"
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <SelectBox
          name="level"
          label="Level of the resource (Choose or type your own)"
          value={values.level}
          handleSelectChange={handleSelectChange}
        />
        <br />
        <br />
        <TextField
          id="preparation"
          label="Time needed for preparation (slide bar or type - number of minutes)"
          value={values.preparation}
          onChange={handleChange("preparation")}
          margin="normal"
          style={{ width: "100%" }}
        />
        <input
          id="preparation"
          className="slider-bar"
          type="range"
          min="0"
          max="60"
          value={values.preparation}
          onChange={handleChange("preparation")}
          step="1"
        />
        <br />
        <br />
        <TextField
          id="timeInClass1"
          label="Time needed in class (slide bar or type - number of minutes)"
          value={values.timeInClass}
          onChange={handleChange("timeInClass")}
          margin="normal"
          style={{ width: "100%" }}
        />
        <input
          id="timeInClass2"
          className="slider-bar"
          type="range"
          min="0"
          max="120"
          value={values.timeInClass}
          onChange={handleChange("timeInClass")}
          step="1"
        />
        <br />
        <br />
        <SelectBox
          label="Type of pupil tasks - (Choose or type your own)"
          name="pupilTask"
          value={values.pupilTask}
          handleSelectChange={handleSelectChange}
        />
        <br />
        <br />

        <Button variant="contained" color="secondary" onClick={this.back}>
          Back
        </Button>
        {this.continueButton()}
      </Paper>
    );
  }
}

export default FormQuickMaterial;
