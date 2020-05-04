import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import Viewer from "../Viewer/Viewer";
import SocialShare from "./SocialShare";
import { NavLink } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ToggleLikes from "../helpers/ToggleLikes";
import red from "@material-ui/core/colors/red";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Link } from "react-router-dom";
import DeleteMaterial from "../helpers/DeleteMaterial";

const cardWidth = document.documentElement.clientWidth < 600 ? "98%" : 250;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: cardWidth,
    marginLeft: "auto",
    marginRight: "auto",
  },
  media: {
    // paddingTop: "56.25%", // 16:9
    height: 200,
    overflow: "hidden",
    paddingBottom: 5,
  },
  avatar: {
    backgroundColor: red[500],
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 4,
  },
}));

export default function MaterialCard({ material, setMaterials, materials }) {
  const classes = useStyles();
  const [likes, setLikes] = React.useState(material.likes || []);

  const author = localStorage.getItem("USER_ID");
  const toggleLikes = () => {
    ToggleLikes(author, likes, setLikes, material._id);
  };

  const handleDeleteMaterial = () => {
    console.log("in card menu delte", material);
    DeleteMaterial(material._id);
    setMaterials(materials.filter((m) => m._id !== material._id));
  };
  const setLikesColour = () => {
    let color = "default";
    likes.forEach((like) => {
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

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardActionArea>
          <div className={classes.media}>
            <Avatar
              aria-label="material"
              alt={material.title}
              src={material.author_img}
              className={classes.avatar}
            ></Avatar>
            <Viewer file={material.files[0]} key={material.files[0]} />
          </div>
          <br />
          <NavLink
            to={{ pathname: "/material/" + material._id }}
            className="link"
            key="ma"
          >
            <CardContent>
              <Typography variant="h6" component="h6">
                {material.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                gutterBottom
              >
                {dateMod}
              </Typography>
              {material.objective ? (
                <Typography variant="body2" color="textSecondary" component="p">
                  {material.objective}
                </Typography>
              ) : null}
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
          {author === material.author_id ? (
            <React.Fragment>
              <IconButton component={Link} to={"/edit/" + material._id}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={(event) => handleDeleteMaterial(event)}>
                <DeleteForeverIcon />
              </IconButton>
            </React.Fragment>
          ) : null}
        </CardActions>
      </Card>
      <SocialShare handleClose={handleClose} open={open} />
    </React.Fragment>
  );
}
