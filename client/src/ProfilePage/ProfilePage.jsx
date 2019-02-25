import React, { Component } from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import { getSecret } from "../auth/helpers";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.auth
    };
  }

  showData = async () => {
    const data = await getSecret();
    await console.log(data);
    await this.setState({ data: data });
  };

  render() {
    // console.log("auth: ", this.props.auth);

    return (
      <Paper className="paperCenter" elevation={1}>
        <Typography variant="h5" component="h2">
          Profile
        </Typography>

        <Button onClick={this.showData}>getSecret</Button>
        <h2>{this.state.data}</h2>
      </Paper>
    );
  }
}

export default Profile;
