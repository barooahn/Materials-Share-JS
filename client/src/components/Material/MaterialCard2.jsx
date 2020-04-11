import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Viewer from "../Viewer/Viewer";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    // paddingTop: "56.25%", // 16:9
    height: 200,
    overflow: "hidden",
    marginLeft: -16,
    marginRight: -16,
    paddingBottom: 5
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function MaterialCard2({ material }) {
  const classes = useStyles();

  //set date
  const date = new Date(material.dateModified);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const dateMod = date.toLocaleDateString(undefined, options);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="material" className={classes.avatar}>
            M
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={material.title}
        subheader={dateMod}
      />
      <CardContent>
        <div className={classes.media}>
          <Viewer file={material.files[0]} key={material.files[0]} />
        </div>
        <br />
        {material.objective ? (
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Objective:</strong> {material.objective}
          </Typography>
        ) : null}
        {material.timpPrep.length > 0 ? (
          <Typography variant="body2" color="textSecondary" component="p">
            Preparation Time (mins): {material.timpPrep}
          </Typography>
        ) : null}
        {material.timeInClass.length > 0 ? (
          <Typography variant="body2" color="textSecondary" component="p">
            Class Time (mins): {material.timeInClass}
          </Typography>
        ) : null}
        {material.level.length > 0 ? (
          <Typography variant="body2" color="textSecondary" component="p">
            Level:
            {material.level.map(level => (
              <span key={level.label}>{level.label} </span>
            ))}
          </Typography>
        ) : null}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <NavLink
          to={{ pathname: "/material/" + material._id }}
          className="link"
          key="ma"
        >
          <Button size="small" color="primary">
            Full Details
          </Button>
        </NavLink>
      </CardActions>
    </Card>
  );
}
