import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
// import { ReactComponent as InstagramIcon } from "../../Icons/instagramLogo.svg";
// import { ReactComponent as LinkedInIcon } from "../../Icons/linkedin.svg";
import SvgIcon from "@material-ui/core/SvgIcon";
import {
  Instagram,
  LinkedIn,
  Facebook,
  Reply,
  Email,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    // padding: theme.spacing(0, 5),
    // margin: `${theme.spacing(1)}px auto`,
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      textAlign: "left",
      marginTop: "100px",
    },
    verticalAlign: "middle",
  },
  typography: {
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      textAlign: "right",
      marginBottom: 30,
      paddingRight: 40,
    },
  },
  title: {
    padding: "1rem",
    backgroundColor: "rgba(0, 0, 0, 0.87)",
    color: "#fff",
    margin: 0,
    [theme.breakpoints.up("sm")]: {
      margin: "0 -24px",
    },
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
  SVGicon: {
    fontSize: 45,
    marginBottom: 20,
    marginRight: 5,
    [theme.breakpoints.up("sm")]: {
      paddingTop: 5,
      fontSize: 55,
      marginBottom: 25,
    },
  },
}));

export default function AutoGridNoWrap() {
  const classes = useStyles();

  return (
    <main>
      <Typography
        className={classes.title}
        align="center"
        variant="h1"
        component="h1"
      >
        Teaching Resources Made Simple
      </Typography>

      <br />
      <div className={classes.root}>
        {/* <Paper className={classes.paper}> */}
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item sm={7} xs={12}>
            <NavLink to="/create" className="link">
              <Typography
                className={classes.typography}
                variant="h3"
                component="h3"
              >
                Documents, pictures or video
              </Typography>
            </NavLink>
          </Grid>
          <Grid item sm={5} xs={12}>
            <NavLink to="/create" className="link">
              <Icon className={classes.icon} color="secondary">
                post_add
              </Icon>
              <Icon className={classes.icon} color="secondary">
                camera_alt
              </Icon>
              <Icon className={classes.icon} color="secondary">
                video_call
              </Icon>
            </NavLink>
          </Grid>
          <Grid item sm={7} xs={12}>
            <NavLink to="/create" className="link">
              <Typography
                className={classes.typography}
                variant="h3"
                component="h3"
              >
                Save securely, forever. Access anywhere
              </Typography>
            </NavLink>
          </Grid>
          <Grid item sm={5} xs={12}>
            <NavLink to="/create" className="link">
              <Icon className={classes.icon} color="secondary">
                enhanced_encryption
              </Icon>
              <Icon className={classes.icon} color="secondary">
                cloud_upload
              </Icon>
            </NavLink>
          </Grid>
          <Grid item sm={7} xs={12}>
            <Typography
              className={classes.typography}
              variant="h3"
              component="h3"
            >
              Share with other teachers
            </Typography>
          </Grid>
          <Grid item sm={5} xs={12}>
            <SvgIcon className={classes.SVGicon} color="secondary">
              <Instagram />
            </SvgIcon>
            <SvgIcon className={classes.SVGicon} color="secondary">
              <LinkedIn />
            </SvgIcon>
            <SvgIcon className={classes.SVGicon} color="secondary">
              <Facebook />
            </SvgIcon>
            <SvgIcon className={classes.SVGicon} color="secondary">
              <Reply />
            </SvgIcon>
            <SvgIcon className={classes.SVGicon} color="secondary">
              <Email />
            </SvgIcon>
          </Grid>
          <Grid item sm={7} xs={12}>
            <Typography
              className={classes.typography}
              variant="h3"
              component="h5"
            >
              Save time with search and filter
            </Typography>
          </Grid>
          <Grid item sm={5} xs={12}>
            <Icon className={classes.icon} color="secondary">
              search
            </Icon>
            <Icon className={classes.icon} color="secondary" height="50px">
              filter_list
            </Icon>
          </Grid>
        </Grid>
        {/* </Paper> */}
      </div>
    </main>
  );
}
