import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FormControlLabel, Checkbox, Paper, Grid } from "@material-ui/core";
import Viewer from "./Viewer/Viewer";
import DisplayMaterialList from "./DisplayMaterialList";

// const resource = [
//   { title: "Title" },
//   { timeInClass: "Time In Class (mins)" },
//   { procedureBefore: "Procedure Before Class" },
//   { procedureIn: "Procedure In The Classroom" },
//   { followUp: "Follow Up Activities" },
//   { variations: "Variations On The Resource" },
//   { tips: "Tips" },
//   { notes: "Notes" },
//   { category: "Institute" },
//   { objective: "Objective" },
//   { level: "Level" },
//   { languageFocus: "Language Focus" },
//   { pupilTask: "Tasks For Pupils" },
//   { activityUse: "Activity Use" },
//   { materials: "Materials needed" },
//   { preparation: "Time Needed For Preperation (mins)" }
// ];

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shared: true
    };
    this.props.values.shared = "true";
  }

  // getLabel = (resource, name) => {
  //   const label = resource.filter(x => name in x);
  //   console.log("label ", label[0][name]);
  //   return label[0][name];
  // };

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
    this.props.handleSelectChange("shared", event.target.checked.toString());
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  // getFilledProps = props => {
  //   console.log("props", props);
  //   let filled = [];
  //   for (var propName in props) {
  //     if (
  //       props[propName] !== "" &&
  //       props[propName] !== undefined &&
  //       props[propName] !== null &&
  //       props[propName] !== 0 &&
  //       props[propName].length > 0
  //     ) {
  //       filled.push(propName);
  //     }
  //   }
  //   console.log("filled... ", filled);
  //   return filled;
  // };

  continueButton = () => {
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
        <Typography variant="h6" component="h5">
          I still have a few edits to make
        </Typography>
        <Button variant="contained" color="secondary" onClick={this.back}>
          Back
        </Button>
        <br />
        <Typography variant="h6" component="h5">
          It all looks good. Save it
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
  };

  // buildResultsArray = filledValues => {
  //   const { values } = this.props;
  //   let results = [];
  //   filledValues.forEach(value => {
  //     if (Array.isArray(values[value])) {
  //       let arrayValue = [];
  //       values[value].forEach(x => {
  //         arrayValue.push(x.label);
  //       });
  //       results.push({
  //         name: this.getLabel(resource, value),
  //         value: arrayValue
  //       });
  //     } else {
  //       results.push({
  //         name: this.getLabel(resource, value),
  //         value: values[value]
  //       });
  //     }
  //   });
  //   console.log("results ", results);
  //   return results;
  // };

  render() {
    const { values } = this.props;
    // console.log("confirm values", values);

    // let filledValues = this.getFilledProps(values);

    // filledValues = filledValues.filter(
    //   x =>
    //     x !== "filePaths" &&
    //     x !== "showContinue" &&
    //     x !== "selectedFiles" &&
    //     x !== "showUpload" &&
    //     x !== "loaded" &&
    //     x !== "book" &&
    //     x !== "author" &&
    //     x !== "shared" &&
    //     x !== "comments"
    // );

    // const gridItem = this.buildResultsArray(filledValues).map(resource => {
    //   return (
    //     <Grid item xs={12} md={6} key={resource.name}>
    //       <List>
    //         <ListItem>
    //           <ListItemText
    //             style={styles.p_wrap}
    //             key={resource.name}
    //             primary={resource.name}
    //             secondary={
    //               <React.Fragment>
    //                 {Array.isArray(resource.value) &&
    //                   resource.value.map(x => {
    //                     return (
    //                       <span style={styles.selectSpans} key={x}>
    //                         {x}
    //                       </span>
    //                     );
    //                   })}
    //                 {!Array.isArray(resource.value) && resource.value}
    //               </React.Fragment>
    //             }
    //           />
    //         </ListItem>
    //       </List>
    //     </Grid>
    //   );
    // });

    return (
      <Paper className="paperCenter" elevation={1}>
        <Typography variant="h4" component="h2">
          {values.title}
        </Typography>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <List>
              <ListItem>
                <div className="attachement">
                  {values.filePaths.map(file => (
                    <Viewer key={file} file={file} />
                  ))}
                </div>
              </ListItem>
            </List>
          </Grid>

          {DisplayMaterialList(values)}

          {values.book.title !== "" ? (
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Material used in conjuction with text book"
                    secondary={
                      <React.Fragment>
                        {values.book.title}
                        {" - Page " + values.book.page}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          ) : null}
        </Grid>

        <br />
        {this.continueButton()}
      </Paper>
    );
  }
}

// const styles = {
//   button: {
//     margin: 15
//   },
//   p_wrap: {
//     whiteSpace: "pre-line"
//   },
//   selectSpans: {
//     display: "block"
//   }
// };

export default Confirm;
