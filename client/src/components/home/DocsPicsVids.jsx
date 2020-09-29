import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    height: "100VH",
    margin: "0 0 56px 0",
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundImage: "url(./img/DocsPicsVidsImg-80.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "rgb(235,235,235)",
    [theme.breakpoints.up("sm")]: {
      textAlign: "left",
      margin: "0 -24px",
      backgroundPosition: "center",
      backgroundSize: "100% auto ",
    },
  },
  docsPicsVidImg: {},

  typography: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    padding: "0.5rem 0 1.2rem 0",
    [theme.breakpoints.up("sm")]: {
      padding: 20,
      textAlign: "left",
      marginBottom: 30,
      marginLeft: 20,
      fontSize: "1.5rem",
    },
  },
  proTip: {
    padding: "0 0 1rem 0",
    [theme.breakpoints.up("sm")]: { marginLeft: 40 },
  },
  docsPicsVidText: {
    marginTop: "27%",
    padding: "10px",
    backgroundColor: "rgba(235,235,235, 0.98)",
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
      width: "100%",
      height: "100%",
    },
  },
  title: {
    padding: "1rem",
    backgroundColor: "rgba(0, 0, 0, 0.87)",
    color: "#fff",
    margin: "30px 0",
    [theme.breakpoints.up("sm")]: {},
    overflow: "hidden",
  },
  icon: {
    fontSize: 40,
    marginRight: 10,
    marginBottom: 20,
    [theme.breakpoints.up("sm")]: {
      marginBottom: 30,
      paddingTop: 5,
      fontSize: 50,
    },
  },
}));

export default function DocsPicsVids() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.slideContent}>
        <Typography
          className={classes.title}
          align="center"
          variant="h1"
          component="h1"
        >
          Documents, Pictures and Video
        </Typography>

        <br />
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item sm={6} xs={12}>
            <div className={classes.docsPicsVidText}>
              <Typography
                className={classes.typography}
                variant="body"
                component="body"
              >
                Upload Word documents, PDF files, vidoes, images or any
                combination of the above to create the perfect teaching
                resource.
              </Typography>
              <Typography
                className={classes.typography}
                variant="body"
                component="body"
              >
                Describe how the material is used and give additional details to
                help your material be easily found when you need it, using
                search and filter.
              </Typography>
              <Typography
                className={classes.proTip}
                variant="h2"
                component="h3"
                color="secondary"
              >
                Pro Tip
              </Typography>
              <Typography
                className={classes.typography}
                variant="body"
                component="body"
              >
                Why not complete all the fields when uploading a resource and
                make your own resource book? Just print and send to the
                publishers. Useful day-to-day, attractive to employers, and
                evidence of professional development.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
