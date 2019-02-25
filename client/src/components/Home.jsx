import React, { Component } from "react";
import HomeMain from "./HomeMain";
import { Grid, Paper, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

class Home extends Component {
  state = {};

  handleSearch = () => {};

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Paper className="paperCenter" elevation={1}>
          <Typography align="center" variant="h4" component="h1">
            Teaching resources made easy
          </Typography>
          <Typography align="center" variant="h6" component="h2">
            It's simple ...
          </Typography>
          <br />
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <HomeMain />
            </Grid>
          </Grid>
        </Paper>
      </main>
    );
  }
}

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  }
});

export default withStyles(styles)(Home);
