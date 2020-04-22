import React, { Component } from "react";
import HomeMain from "./HomeMain";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

class Home extends Component {
  state = {};

  handleSearch = () => {};

  render() {
    return (
      <main className="main">
        <Paper className="paperCenter" elevation={1}>
          <Typography align="center" variant="h4" component="h1">
            Teaching resources made easy
          </Typography>
          <Typography align="center" variant="h6" component="h2">
            It's simple ...
          </Typography>
          <br />
          <Grid container spacing={10}>
            <Grid item xs={10}>
              <HomeMain />
            </Grid>
          </Grid>
        </Paper>
      </main>
    );
  }
}

export default Home;
