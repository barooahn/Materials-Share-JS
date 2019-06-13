import React, { Component } from "react";
import {
  Button,
  FormHelperText,
  LinearProgress,
  Typography,
  Paper,
  TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AsyncCreatableSelect from "react-select/lib/AsyncCreatable";
import axios from "axios";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

//get material check if value is null, undefined, 0 or ""
//if true add to empty array
// else add to filled array

//renderList
//take array check if components in array

class EditMaterial extends Component {
  constructor(props) {
    super(props);
    const {
      files,
      title,
      timeInClass,
      procedureBefore,
      procedureIn,
      followUp,
      variations,
      tips,
      notes,
      category,
      objective,
      level,
      languageFocus,
      activityUse,
      pupilTask,
      shared,
      materials,
      preparation
    } = this.props.location.state.material;

    this.state = {
      expanded: null,
      selectedFiles: [],
      filePaths: [],
      files: files,
      title: title,
      timeInClass: timeInClass,
      procedureBefore: procedureBefore,
      procedureIn: procedureIn,
      book: [{ title: "", page: 0 }],
      followUp: followUp,
      variations: variations,
      tips: tips,
      notes: notes,
      category: category,
      objective: objective,
      level: level,
      languageFocus: languageFocus,
      activityUse: activityUse,
      pupilTask: pupilTask,
      shared: shared,
      materials: materials,
      preparation: preparation,
      clap: 0,
      comments: [{ author: { _id: null, text: "" } }]
    };
    // this.props.material.loaded = 0;
  }

  handleExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleLevelChange = (newValue, actionMeta) => {
    this.handleSelectChange("level", newValue);
  };
  handlePupilTaskChange = (newValue, actionMeta) => {
    this.handleSelectChange("pupilTask", newValue);
  };
  handleCategoryChange = (newValue, actionMeta) => {
    this.handleSelectChange("category", newValue);
  };
  handleActivityUseChange = (newValue, actionMeta) => {
    this.handleSelectChange("activityUse", newValue);
  };
  handleLanguageFocusChange = (newValue, actionMeta) => {
    this.handleSelectChange("languageFocus", newValue);
  };

  // Handle fields change
  handleChange = input => e => {
    // console.log("handle", input, e.target.value);
    this.setState({ [input]: e.target.value });
  };

  // Handle special case book change
  handleBookChange = input => e => {
    let book = { ...this.state.book };
    book[input] = this.jsUcfirst(e.target.value); //updating value
    this.setState({ book });
  };

  handleSelectChange = (input, value) => {
    // console.log("select changed ", input, value);
    this.setState({ [input]: value });
    // console.log("state changed ", this.state[input]);
  };

  getInputSelectOptions = field =>
    new Promise(resolve => {
      // console.log("getting options...");
      resolve(
        axios
          .get("/api/material/field/" + field)
          .then(res => {
            //.log("options ", res.data);
            return res.data.map(label => ({
              label: label,
              value: label.toLowerCase().replace(/\W/g, "")
            }));
          })
          .catch(function(err) {
            throw err;
          })
      );
    });

  render() {
    const { classes } = this.props;
    const {
      expanded,
      files,
      title,
      timeInClass,
      procedureBefore,
      procedureIn,
      followUp,
      variations,
      tips,
      notes,
      category,
      objective,
      level,
      languageFocus,
      activityUse,
      pupilTask,
      shared,
      book,
      materials,
      preparation
    } = this.state;
    const {
      //   values,
      //   handleDelete,
      //   handleUpload,
      material
      //handleselectedFile
    } = this.props.location.state;
    console.log("material ", this.props.location.state.material);
    const newSelectedFiles = material.files.map(file => {
      return <li key={file.name}>{file.name}</li>;
    });

    // const newFilePaths = material.filePaths.map(file => {
    //   return (
    //     <li key={file}>
    //       {file}
    //       <Icon
    //         className="delete-icon"
    //         // onClick={() => handleDelete(file)}
    //         color="secondary"
    //       >
    //         delete_forever
    //       </Icon>
    //     </li>
    //   );
    // });

    //to implement update material

    // saveMin = () => {
    //   console.log("saving to db...");
    //   const { filePaths, title } = this.state;
    //   if (filePaths !== {} && title !== "") {
    //     console.log("validated for db");

    //     const material = {
    //       files: filePaths,
    //       title: this.jsUcfirst(title).trim(),
    //       dateCreated: new Date(),
    //       dateModified: new Date()
    //     };
    //     this.sendToDb(material);
    //   }
    // };

    // sendToDb = material => {
    //   material.author_id = localStorage.getItem("USER_ID");
    //   console.log("sending material to db...", material);
    //   axios
    //     .post("/api/material/", material, {
    //       onUploadProgress: ProgressEvent => {
    //         this.setState({
    //           loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
    //         });
    //       }
    //     })
    //     .then(res => {
    //       console.log("saved to db", res.data);
    //       this.setState({
    //         step: 6
    //       });
    //     })
    //     .catch(function(err) {
    //       throw err;
    //     });
    // };

    const ExpansionPanelDetails = withStyles(theme => ({
      root: {
        display: "block"
      }
    }))(MuiExpansionPanelDetails);

    return (
      <React.Fragment>
        <Paper className="paperCenter" elevation={1}>
          <div className={classes.root}>
            <ExpansionPanel
              expanded={expanded === "panel1"}
              onChange={this.handleExpand("panel1")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Add Additional Files
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  Add New Files Here
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="h5" component="h2">
                  Click 'Select File(s)' button to choose one or more files to
                  save
                </Typography>
                <br />
                <br />

                <input
                  accept="image/*, audio/*, video/*, .pdf, .docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  id="contained-button-file"
                  className="inputFile"
                  multiple
                  type="file"
                  // onChange={handleselectedFile}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span">
                    Select File(s)
                  </Button>
                </label>

                <br />
                <br />
                {material.showUpload ? (
                  <React.Fragment>
                    <FormHelperText>Selected files</FormHelperText>

                    <ul>{newSelectedFiles}</ul>

                    <Button
                      variant="contained"
                      color="primary"
                      // onClick={handleUpload}
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
                      value={Math.round(material.loaded, 2)}
                    />

                    <br />

                    <FormHelperText>Uploaded files</FormHelperText>

                    {/* <ul>{newFilePaths}</ul> */}
                  </React.Fragment>
                ) : null}
                {material.showContinue ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className="contiune"
                    onClick={this.continue}
                  >
                    Continue
                  </Button>
                ) : null}
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel2"}
              onChange={this.handleExpand("panel2")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Remove Existing Files{" "}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  Remove Files You Previously Added
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel3"}
              onChange={this.handleExpand("panel3")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Add Additional Information
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  Add New Fields To Your Existing Resource
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                  Integer sit amet egestas eros, vitae egestas augue. Duis vel
                  est augue.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel4"}
              onChange={this.handleExpand("panel4")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Edit Existing Resource Information
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  Change The Fields You Have Already Input
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  <TextField
                    id="standard-name"
                    label="Title"
                    value={title}
                    onChange={this.handleChange("title")}
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <TextField
                    id="objective"
                    label="Objective of the resource"
                    value={objective}
                    placeholder="By the end of the activity pupils will be able to:"
                    onChange={this.handleChange("objective")}
                    multiline
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
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
                    loadOptions={() => this.getInputSelectOptions("level")}
                    defaultValue={level}
                    onChange={this.handleLevelChange}
                  />
                  <br />
                  <br />
                </div>
                <div>
                  <TextField
                    id="preparation"
                    label="Time needed for preparation (slide bar or type - number of minutes)"
                    value={preparation}
                    onChange={this.handleChange("preparation")}
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                  <input
                    id="preparation"
                    className="slider-bar"
                    type="range"
                    min="0"
                    max="60"
                    value={preparation}
                    onChange={this.handleChange("preparation")}
                    step="1"
                  />
                  <br />
                  <br />
                </div>
                <div>
                  <TextField
                    id="timeInClass1"
                    label="Time needed in class (slide bar or type - number of minutes)"
                    value={timeInClass}
                    onChange={this.handleChange("timeInClass")}
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                  <input
                    id="timeInClass2"
                    className="slider-bar"
                    type="range"
                    min="0"
                    max="120"
                    value={timeInClass}
                    onChange={this.handleChange("timeInClass")}
                    step="1"
                  />
                  <br />
                  <br />
                </div>
                <div>
                  <FormHelperText>
                    Type of pupil tasks - (Choose or type your own)
                  </FormHelperText>
                  <br />
                  <AsyncCreatableSelect
                    cacheOptions
                    defaultOptions
                    isMulti
                    name="pupilTask"
                    defaultValue={pupilTask}
                    loadOptions={() => this.getInputSelectOptions("pupilTask")}
                    onChange={this.handlePupilTaskChange}
                  />
                  <br />
                  <br />
                </div>
                <div>
                  <TextField
                    id="procedureBefore"
                    label="Procedure before class (you can use multiple lines)"
                    placeholder="eg. Make one copy of the handout for each pupil."
                    value={procedureBefore}
                    onChange={this.handleChange("procedureBefore")}
                    multiline
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                </div>
                <div>
                  <TextField
                    id="procedureIn"
                    label="Procedure in class (you can use multiple lines)"
                    value={procedureIn}
                    onChange={this.handleChange("procedureIn")}
                    multiline
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                </div>
                <div>
                  <FormHelperText>
                    Is the resource based on a textbook?
                  </FormHelperText>
                  <TextField
                    id="book"
                    label="Text book title"
                    value={book.title}
                    onChange={this.handleBookChange("title")}
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                  <TextField
                    id="page"
                    label="Page of text book"
                    value={book.page}
                    onChange={this.handleBookChange("page")}
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                </div>
                <div>
                  <TextField
                    id="followUp"
                    label="Follow up activities (you can use multiple lines)"
                    value={followUp}
                    onChange={this.handleChange("followUp")}
                    multiline
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                  <br />
                </div>
                <div>
                  <TextField
                    id="variations"
                    label="Variations on the material use (you can use multiple lines)"
                    placeholder="eg. For weaker students..."
                    value={variations}
                    onChange={this.handleChange("variations")}
                    multiline
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                  <br />
                </div>
                <div>
                  <TextField
                    id="materials"
                    label="What materials do I need?"
                    placeholder="eg. Finger puppet template, colour pencils, scissors and tape."
                    value={materials}
                    onChange={this.handleChange("materials")}
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                  <br />
                </div>
                <div>
                  <TextField
                    id="tips"
                    label="tips (you can use multiple lines)"
                    value={tips}
                    onChange={this.handleChange("tips")}
                    multiline
                    margin="normal"
                    style={{ width: "100%" }}
                    placeholder="eg. Pupils can use the completed worksheets to make a classroom display "
                  />
                  <br />
                </div>
                <div>
                  <TextField
                    id="notes"
                    label="notes (you can use multiple lines)"
                    value={notes}
                    onChange={this.handleChange("notes")}
                    multiline
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                  <br />
                </div>
                <div>
                  <FormHelperText>
                    What institue is the material for? - School, language center
                    etc.
                  </FormHelperText>
                  <FormHelperText>(Choose or create your own)</FormHelperText>
                  <br />
                  <AsyncCreatableSelect
                    cacheOptions
                    defaultOptions
                    name="category"
                    isMulti
                    defaultValue={category}
                    loadOptions={() => this.getInputSelectOptions("category")}
                    onChange={this.handleCategoryChange}
                  />
                  <br />
                </div>
                <div>
                  <FormHelperText>
                    What is the language focus of the resource? - Speaking,
                    Listening etc.
                  </FormHelperText>
                  <FormHelperText>(Choose or create your own)</FormHelperText>
                  <br />
                  <AsyncCreatableSelect
                    cacheOptions
                    defaultOptions
                    isMulti
                    name="languageFocus"
                    defaultValue={languageFocus}
                    loadOptions={() =>
                      this.getInputSelectOptions("languageFocus")
                    }
                    onChange={this.handleLanguageFocusChange}
                  />
                </div>
                <div>
                  <FormHelperText>
                    What is the activity use of the resource? - Production,
                    Presenetation etc.
                  </FormHelperText>
                  <FormHelperText>(Choose or create your own)</FormHelperText>
                  <br />
                  <AsyncCreatableSelect
                    cacheOptions
                    defaultOptions
                    defaultValue={activityUse}
                    isMulti
                    name="activityUse"
                    loadOptions={() =>
                      this.getInputSelectOptions("activityUse")
                    }
                    onChange={this.handleActivityUseChange}
                  />
                </div>
                <div>
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.props.update}
                  >
                    Save
                  </Button>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </Paper>
      </React.Fragment>
    );
  }
}

EditMaterial.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditMaterial);
