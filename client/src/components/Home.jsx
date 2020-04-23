import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    // padding: theme.spacing(0, 5),
    margin: `${theme.spacing(1)}px auto`,
    textAlign: "right"
  },
  icon: { fontSize: 50, paddingTop: 5, marginRight: 20 },
  typography: { fontSize: 40, textAlign: "left" }
}));

export default function AutoGridNoWrap() {
  const classes = useStyles();

  return (
    <main className="main">
      <Typography align="center" variant="h4" component="h1">
        Teaching resources made easy
      </Typography>
      <Typography align="center" variant="h6" component="h2">
        It's simple ...
      </Typography>
      <br />
      <div className={classes.root}>
        {/* <Paper className={classes.paper}> */}
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={6}>
            <NavLink to="/create" className="link">
              <Icon className={classes.icon} color="secondary">
                camera_alt
              </Icon>
            </NavLink>
          </Grid>
          <Grid item xs={6}>
            <NavLink to="/create" className="link">
              <Typography
                className={classes.typography}
                variant="h5"
                component="h2"
                textalign="left"
              >
                Snap
              </Typography>
            </NavLink>
          </Grid>
          <Grid item xs={6}>
            <NavLink to="/create" className="link">
              <Icon className={classes.icon} color="secondary">
                cloud_upload
              </Icon>
            </NavLink>
          </Grid>
          <Grid item xs={6}>
            <NavLink to="/create" className="link">
              <Typography
                className={classes.typography}
                variant="h5"
                component="h2"
                textalign="left"
              >
                Save
              </Typography>
            </NavLink>
          </Grid>
          <Grid item xs={6}>
            <Icon className={classes.icon} color="secondary">
              share
            </Icon>
          </Grid>
          <Grid item xs={6}>
            <Typography
              className={classes.typography}
              variant="h5"
              component="h2"
              textalign="left"
            >
              Share
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Icon className={classes.icon} color="secondary">
              search
            </Icon>
          </Grid>
          <Grid item xs={6}>
            <Typography
              className={classes.typography}
              variant="h5"
              component="h2"
              textalign="left"
            >
              Search
            </Typography>
          </Grid>
        </Grid>
        {/* </Paper> */}
      </div>
    </main>
  );
}
