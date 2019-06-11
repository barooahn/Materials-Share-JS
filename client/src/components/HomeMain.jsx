import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import red from "@material-ui/core/colors/red";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    padding: "10px",
    margin: "20px"
  },
  icon: {
    margin: theme.spacing.unit * 2,
    fontSize: "50px",
    float: "right"
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: red[800]
    }
  },
  typography: {
    //margin: "30px auto",
    lineHeight: "3.4"
  }
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <NavLink to="/create" className="link">
            <Icon className={classes.icon} color="secondary">
              camera_alt
            </Icon>
          </NavLink>
        </Grid>
        <Grid item xs={6}>
          <Typography
            className={classes.typography}
            variant="h5"
            component="h2"
            textalign="left"
          >
            Snap
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Icon className={classes.icon} color="secondary">
            cloud_upload
          </Icon>
        </Grid>
        <Grid item xs={6}>
          <Typography
            className={classes.typography}
            variant="h5"
            component="h2"
            textalign="left"
          >
            Save
          </Typography>
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
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
