import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

export class Success extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <React.Fragment>
        <Typography variant="h4" component="h2">
          Success
        </Typography>
        <h1>Thank You For Your Submission</h1>
        <p>You will get an email with further instructions</p>
      </React.Fragment>
    );
  }
}

export default Success;
