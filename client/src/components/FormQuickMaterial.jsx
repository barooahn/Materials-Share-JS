import React, { Component } from "react";
import {
  TextField,
  Paper,
  Typography,
  Button,
  FormHelperText,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

import AsyncCreatableSelect from "react-select/lib/AsyncCreatable";

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
  handleLevelChange = (newValue, actionMeta) => {
    this.props.handleSelectChange("level", newValue);
    // console.log("new value: ", this.props.values.level);
  };

  handlePupilTaskChange = (newValue, actionMeta) => {
    this.props.handleSelectChange("pupilTask", newValue);
    // console.log("new value: ", this.props.values.pupilTask);
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
    const { values, handleChange, getInputSelectOptions } = this.props;

    console.log("Level", getInputSelectOptions("level"));

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
        <FormHelperText>
          Level of the resource (Choose or type your own)
        </FormHelperText>
        <br />
        <AsyncCreatableSelect
          cacheOptions
          defaultOptions
          isMulti
          name="level"
          loadOptions={() => getInputSelectOptions("level")}
          defaultValue={values.level}
          onChange={this.handleLevelChange}
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
        <FormHelperText>
          Type of pupil tasks - (Choose or type your own)
        </FormHelperText>
        <br />
        <AsyncCreatableSelect
          cacheOptions
          defaultOptions
          isMulti
          name="pupilTask"
          defaultValue={values.pupilTask}
          loadOptions={() => getInputSelectOptions("pupilTask")}
          onChange={this.handlePupilTaskChange}
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
