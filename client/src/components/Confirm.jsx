import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FormControlLabel, Checkbox, Paper, Grid } from "@material-ui/core";
import Viewer from "./Viewer/Viewer";
import DisplayMaterialList from "./DisplayMaterialList";


class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shared: true
    };
    this.props.values.shared = "true";
  }

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
    this.props.handleSelectChange("shared", event.target.checked.toString());
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

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

  render() {
    const { values } = this.props;
    // console.log("confirm values", values);

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
