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

class FormFullMaterial extends Component {
  constructor(props) {
    super(props);
    this.props.values.showContinue = false;
    this.props.values.shared = "true";
    this.state = {
      shared: true
    };
  }

  handleCategoryChange = (newValue, actionMeta) => {
    this.props.handleSelectChange("category", newValue);
    console.log("new value: ", this.props.values.category);
  };
  handleActivityUseChange = (newValue, actionMeta) => {
    this.props.handleSelectChange("activityUse", newValue);
    console.log("new value: ", this.props.values.activityUse);
  };
  handleLanguageFocusChange = (newValue, actionMeta) => {
    this.props.handleSelectChange("languageFocus", newValue);
    console.log("new value: ", this.props.values.languageFocus);
  };

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
    this.props.handleSelectChange("shared", event.target.checked.toString());
  };

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  continueButton() {
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
        <br />
        <Typography variant="h6" component="h4">
          I'd like to preview my resource
        </Typography>
        <Typography variant="body1">(before saving)</Typography>
        <Button
          variant="contained"
          color="primary"
          className="contiune"
          onClick={this.continue}
        >
          Preview
        </Button>
        <br />
        <br />
        <Typography variant="h6" component="h4">
          I'd just like to save it now
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="contiune"
          onClick={this.props.saveFull}
        >
          Save
        </Button>
      </React.Fragment>
    );
  }

  render() {
    const paperCenter = {
      width: "80%",
      margin: "20px auto",
      padding: "15px"
    };
    const {
      values,
      handleChange,
      handleBookChange,
      getInputSelectOptions
    } = this.props;

    return (
      <React.Fragment>
        <Paper style={paperCenter} elevation={1}>
          <Typography variant="h5" component="h2">
            Complete the following to have a resource of publishable standard
          </Typography>
          <br />
          <TextField
            id="procedureBefore"
            label="Procedure before class (you can use multiple lines)"
            placeholder="eg. Make one copy of the handout for each pupil."
            value={values.procedureBefore}
            onChange={handleChange("procedureBefore")}
            multiline
            margin="normal"
            style={{ width: "100%" }}
          />
          <br />
          <br />
          <TextField
            id="procedureIn"
            label="Procedure in class (you can use multiple lines)"
            value={values.procedureIn}
            onChange={handleChange("procedureIn")}
            multiline
            margin="normal"
            style={{ width: "100%" }}
          />
          <br />
          <br />
          <FormHelperText>Is the resource based on a textbook?</FormHelperText>
          <TextField
            id="book"
            label="Text book title"
            value={values.book.title}
            onChange={handleBookChange("title")}
            margin="normal"
            style={{ width: "100%" }}
          />
          <TextField
            id="page"
            label="Page of text book"
            value={values.book.page}
            onChange={handleBookChange("page")}
            margin="normal"
            style={{ width: "100%" }}
          />
          <br />
          <br />
          <TextField
            id="followUp"
            label="Follow up activities (you can use multiple lines)"
            value={values.followUp}
            onChange={handleChange("followUp")}
            multiline
            margin="normal"
            style={{ width: "100%" }}
          />
          <br />
          <TextField
            id="variations"
            label="Variations on the material use (you can use multiple lines)"
            placeholder="eg. For weaker students..."
            value={values.variations}
            onChange={handleChange("variations")}
            multiline
            margin="normal"
            style={{ width: "100%" }}
          />
          <br />
          <TextField
            id="materials"
            label="What materials do I need?"
            placeholder="eg. Finger puppet template, colour pencils, scissors and tape."
            value={values.materials}
            onChange={handleChange("materials")}
            margin="normal"
            style={{ width: "100%" }}
          />
          <br />
          <TextField
            id="tips"
            label="tips (you can use multiple lines)"
            value={values.tips}
            onChange={handleChange("tips")}
            multiline
            margin="normal"
            style={{ width: "100%" }}
            placeholder="eg. Pupils can use the completed worksheets to make a classroom display "
          />
          <br />
          <TextField
            id="notes"
            label="notes (you can use multiple lines)"
            value={values.notes}
            onChange={handleChange("notes")}
            multiline
            margin="normal"
            style={{ width: "100%" }}
          />
          <br />
          <FormHelperText>
            What institue is the material for? - School, language center etc.
          </FormHelperText>
          <FormHelperText>(Choose or create your own)</FormHelperText>
          <br />
          <AsyncCreatableSelect
            cacheOptions
            defaultOptions
            name="category"
            isMulti
            defaultValue={values.category}
            loadOptions={() => getInputSelectOptions("category")}
            onChange={this.handleCategoryChange}
          />
          <br />
          <FormHelperText>
            What is the language focus of the resource? - Speaking, Listening
            etc.
          </FormHelperText>
          <FormHelperText>(Choose or create your own)</FormHelperText>
          <br />
          <AsyncCreatableSelect
            cacheOptions
            defaultOptions
            isMulti
            name="languageFocus"
            defaultValue={values.languageFocus}
            loadOptions={() => getInputSelectOptions("languageFocus")}
            onChange={this.handleLanguageFocusChange}
          />
          <FormHelperText>
            What is the activity use of the resource? - Production,
            Presenetation etc.
          </FormHelperText>
          <FormHelperText>(Choose or create your own)</FormHelperText>
          <br />
          <AsyncCreatableSelect
            cacheOptions
            defaultOptions
            defaultValue={values.activityUse}
            isMulti
            name="activityUse"
            loadOptions={() => getInputSelectOptions("activityUse")}
            onChange={this.handleActivityUseChange}
          />
          <br />
          <Button variant="contained" color="secondary" onClick={this.back}>
            Back
          </Button>
          <br />
          {this.continueButton()}
        </Paper>
      </React.Fragment>
    );
  }
}

export default FormFullMaterial;
