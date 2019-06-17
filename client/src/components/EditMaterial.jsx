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
import axios from "axios";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import SelectBox from "./SelectBox";

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
  // jsUcfirst = s => {
  //   if (typeof s !== "string") return "";
  //   return s.charAt(0).toUpperCase() + s.slice(1);
  // };

  // updateMaterial = () => {
  //   console.log("saving to db...");
  //   const {
  //     title,
  //     filePaths,
  //     timeInClass,
  //     procedureBefore,
  //     procedureIn,
  //     book,
  //     page,
  //     followUp,
  //     variations,
  //     tips,
  //     notes,
  //     category,
  //     shared,
  //     objective,
  //     level,
  //     languageFocus,
  //     activityUse,
  //     pupilTask,
  //     materials,
  //     preparation
  //   } = this.state;
  //   if (
  //     filePaths !== {} &&
  //     title !== "" &&
  //     objective !== "" &&
  //     level !== [] &&
  //     preparation !== 0 &&
  //     timeInClass !== 0 &&
  //     pupilTask !== []
  //   ) {
  //     console.log("validated for db");

  //     const material = {
  //       procedureBefore,
  //       procedureIn,
  //       book: this.jsUcfirst(book).trim(),
  //       page,
  //       followUp,
  //       variations,
  //       shared,
  //       tips,
  //       notes,
  //       category,
  //       languageFocus,
  //       activityUse,
  //       materials,
  //       files: filePaths,
  //       title: this.jsUcfirst(title).trim(),
  //       objective: this.jsUcfirst(objective).trim(),
  //       level,
  //       preparation,
  //       timeInClass,
  //       pupilTask,
  //       dateCreated: new Date(),
  //       dateModified: new Date()
  //     };
  //     this.sendToDb(material);
  //   }
  // };

  // sendToDb = material => {
  //   material.author_id = localStorage.getItem("USER_ID");
  //   console.log(
  //     "sending material to db...",
  //     this.props.location.state.material
  //   );
  //   axios
  //     .put(
  //       `/api/material/${this.props.location.state.material._id}/update`,
  //       material,
  //       {
  //         onUploadProgress: ProgressEvent => {
  //           this.setState({
  //             loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
  //           });
  //         }
  //       }
  //     )
  //     .then(res => {
  //       console.log("saved to db", res.data);
  //     })
  //     .catch(function(err) {
  //       throw err;
  //     });
  // };

  render() {
    const { classes } = this.props;
    const {
      expanded,
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

    //console.log("material ", this.props.location.state.material);
    const newSelectedFiles = material.files.map(file => {
      return <li key={file.name}>{file.name}</li>;
    });

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
                    id="title"
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
                    // onChange={this.handleChange("objective")}
                    multiline
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <br />
                  <br />
                  <SelectBox
                    name="level"
                    label="Level of the resource (Choose or type your own)"
                    value={level}
                    handleSelectChange={this.handleSelectChange}
                  />
                  <br />
                  <br />
                </div>
                <div>
                  <TextField
                    id="preparation"
                    label="Time needed for preparation (slide bar or type - number of minutes)"
                    value={preparation}
                    // onChange={this.handleChange("preparation")}
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
                    // onChange={this.handleChange("preparation")}
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
                    // onChange={this.handleChange("timeInClass")}
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
                    // onChange={this.handleChange("timeInClass")}
                    step="1"
                  />
                  <br />
                  <br />
                </div>
                <div>
                  <SelectBox
                    name="pupilTask"
                    label="Type of pupil tasks - (Choose or type your own)"
                    value={pupilTask}
                    handleSelectChange={this.handleSelectChange}
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
                    // onChange={this.handleChange("procedureBefore")}
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
                    // onChange={this.handleChange("procedureIn")}
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
                    // onChange={this.handleChange("followUp")}
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
                    // onChange={this.handleChange("variations")}
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
                    // onChange={this.handleChange("materials")}
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
                    // onChange={this.handleChange("tips")}
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
                    // onChange={this.handleChange("notes")}
                    multiline
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                  <br />
                </div>
                <div>
                  <SelectBox
                    name="category"
                    label="What institue is the material for? - School, language center
                    etc. (Choose or create your own)"
                    value={category}
                    handleSelectChange={this.handleSelectChange}
                  />
                  <br />
                </div>
                <div>
                  <SelectBox
                    name="languageFocus"
                    label="What is the language focus of the resource? - Speaking,
                    Listening etc. (Choose or create your own)"
                    value={languageFocus}
                    handleSelectChange={this.handleSelectChange}
                  />
                </div>
                <div>
                  <SelectBox
                    name="activityUse"
                    label="What is the activity use of the resource? - Production,
                    Presenetation etc. (Choose or create your own)"
                    value={activityUse}
                    handleSelectChange={this.handleSelectChange}
                  />
                </div>
                <div>
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    // onClick={this.updateMaterial}
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
