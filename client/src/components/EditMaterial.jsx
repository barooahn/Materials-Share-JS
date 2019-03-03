import React, { Component } from "react";
import {
  Button,
  FormHelperText,
  LinearProgress,
  Typography,
  Paper,
  Icon
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GetFilledProps from "./GetFilledProps";

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
    this.state = {
      expanded: null,
      selectedFiles: []
    };
    // this.props.material.loaded = 0;
  }

  handleExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const {
      //   values,
      //   handleDelete,
      //   handleUpload,
      material
      //handleselectedFile
    } = this.props.location.state;
    console.log(this.props.location.state.material);
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

    console.log(" filled... ", GetFilledProps(material));
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
                {/* {DisplayMaterialList(material)} */}
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
