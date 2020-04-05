import React, { Component } from "react";

import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";


import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import EditMaterial from "./EditMaterial";

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

class EditHome extends Component {
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
  jsUcfirst = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  updateMaterial = () => {
    console.log("saving to db...");
    const {
      title,
      filePaths,
      timeInClass,
      procedureBefore,
      procedureIn,
      book,
      page,
      followUp,
      variations,
      tips,
      notes,
      category,
      shared,
      objective,
      level,
      languageFocus,
      activityUse,
      pupilTask,
      materials,
      preparation
    } = this.state;
    if (
      filePaths !== {} &&
      title !== "" &&
      objective !== "" &&
      level !== [] &&
      preparation !== 0 &&
      timeInClass !== 0 &&
      pupilTask !== []
    ) {
      console.log("validated for db");

      const material = {
        procedureBefore,
        procedureIn,
        book: this.jsUcfirst(book).trim(),
        page,
        followUp,
        variations,
        shared,
        tips,
        notes,
        category,
        languageFocus,
        activityUse,
        materials,
        files: filePaths,
        title: this.jsUcfirst(title).trim(),
        objective: this.jsUcfirst(objective).trim(),
        level,
        preparation,
        timeInClass,
        pupilTask,
        dateCreated: new Date(),
        dateModified: new Date()
      };
      this.sendToDb(material);
    }
  };

  sendToDb = material => {
    material.author_id = localStorage.getItem("USER_ID");
    console.log(
      "sending material to db...",
      this.props.location.state.material
    );
    axios
      .put(
        `/api/material/${this.props.location.state.material._id}/update`,
        material,
        {
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
            });
          }
        }
      )
      .then(res => {
        console.log("saved to db", res.data);
      })
      .catch(function (err) {
        throw err;
      });
  };

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

    //console.log("material ", this.props.location.state.material);
    const newSelectedFiles = "";
    // const newSelectedFiles = material.files.map(file => {
    //   return <li key={file.name}>{file.name}</li>;
    // });

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
                <EditMaterial
                  handleChange={this.handleChange}
                  handleBookChange={this.handleBookChange}
                  handleSelectChange={this.handleSelectChange}
                  updateMaterial={this.updateMaterial}
                  {...this.state}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </Paper>
      </React.Fragment>
    );
  }
}

EditHome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditHome);
