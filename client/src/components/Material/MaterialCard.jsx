import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Viewer from "../Viewer/Viewer";
import SocialShare from "./SocialShare";
import { NavLink } from "react-router-dom";
import CardMenu from "./CardMenu";
import Badge from "@material-ui/core/Badge";
import ToggleLikes from "../helpers/ToggleLikes";
import red from "@material-ui/core/colors/red";

const cardWidth = document.documentElement.clientWidth < 600 ? "100%" : 250;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: cardWidth
  },
  media: {
    // paddingTop: "56.25%", // 16:9
    height: 150,
    overflow: "hidden",
    marginLeft: -16,
    marginRight: -16,
    paddingBottom: 5
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function MaterialCard({ material, setMaterials, materials }) {
  const classes = useStyles();
  const [likes, setLikes] = React.useState(material.likes || []);
  const author = localStorage.getItem("USER_ID");
  const toggleLikes = () => {
    ToggleLikes(author, likes, setLikes, material._id);
  };

  const setLikesColour = () => {
    let color = "default";
    likes.forEach(like => {
      if (like === author) {
        color = "secondary";
      }
    });
    return color;
  };

  //model stuff
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //set date
  const date = new Date(material.dateModified);
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const dateMod = date.toLocaleDateString(undefined, dateOptions);

  const owner = () => {
    return author === material.author_id ? (
      <CardMenu
        material={material}
        square={true}
        setMaterials={setMaterials}
        materials={materials}
      ></CardMenu>
    ) : null;
  };

  console.log(
    "Material card - athor ",
    author,
    "file creator ",
    material.author_id
  );
  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="material" className={classes.avatar}>
              M
            </Avatar>
          }
          action={owner()}
          title={material.title}
          subheader={dateMod}
        />
        <CardActionArea>
          <NavLink
            to={{ pathname: "/material/" + material._id }}
            className="link"
            key="ma"
          >
            <CardContent>
              <div className={classes.media}>
                <Viewer file={material.files[0]} key={material.files[0]} />
              </div>
              <br />
              {material.objective ? (
                <Typography variant="body2" color="textSecondary" component="p">
                  {material.objective}
                </Typography>
              ) : null}
              {/* {material.timpPrep.length > 0 ? (
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
              ) : null} */}
            </CardContent>
          </NavLink>
        </CardActionArea>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={toggleLikes}
            color={setLikesColour()}
          >
            <Badge color="default" badgeContent={likes.length}>
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="share" onClick={handleOpen}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      <SocialShare handleClose={handleClose} open={open} />
    </React.Fragment>
  );
}
