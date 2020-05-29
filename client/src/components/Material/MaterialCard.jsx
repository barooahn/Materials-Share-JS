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
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import CancelIcon from "@material-ui/icons/Cancel";
import Mobile from "../helpers/mobile";

const cardWidth = Mobile() ? "98%" : 250;

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalDeleteButtons: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

export default function MaterialCard({ material, setMaterials, materials }) {
  const classes = useStyles();
  const [likes, setLikes] = React.useState(material.likes || []);

  //Delete model stuff

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteMaterial = () => {
    handleDeleteOpen();
  };

  const cancelDelete = () => {
    setDeleteOpen(false);
  };

  const confirmDelete = () => {
    DeleteMaterial(material._id);
    setMaterials(materials.filter((m) => m._id !== material._id));
  };
  const author = localStorage.getItem("USER_ID");

  const toggleLikes = () => {
    ToggleLikes(author, likes, setLikes, material._id);
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

  //Share model stuff
  const [shareOpen, setShareOpen] = React.useState(false);
  const handleShareOpen = () => {
    setShareOpen(true);
  };

  const handleShareClose = () => {
    setShareOpen(false);
  };

  //set date
  const date = new Date(material.dateModified);
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const dateMod = date.toLocaleDateString(undefined, dateOptions);

  const thumb = material.thumb ? material.thumb : null;

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardActionArea>
          <NavLink
            to={{ pathname: "/material/" + material.slug }}
            className="link"
            key="ma"
          >
            <div className={classes.media}>
              <Avatar
                aria-label="material"
                alt={material.title}
                src={material.author_img}
                className={classes.avatar}
              ></Avatar>
              <Viewer
                thumb={thumb}
                file={material.files[0]}
                key={material.files[0] + Date.now()}
              />
            </div>
            <CardContent>
              <Typography variant="h6" component="h6">
                {material.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
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
            disabled={!author}
          >
            <Badge color="default" badgeContent={likes.length}>
              <FavoriteIcon />
            </Badge>
          </IconButton>

          <IconButton aria-label="share" onClick={handleShareOpen}>
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

      <SocialShare
        handleShareClose={handleShareClose}
        shareOpen={shareOpen}
        slug={material.slug}
      />
      <Modal
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="Delete Confirm"
        aria-describedby="Confirmation of delete"
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteOpen}>
          <div className={classes.paper}>
            <Typography variant="h6" color="secondary" component="p">
              Are you sure you want to delete? This cannot be undone.
            </Typography>
            <br />
            <div className={classes.modalDeleteButtons}>
              <Button
                color="secondary"
                variant="contained"
                size="large"
                startIcon={<DeleteForeverIcon />}
                onClick={confirmDelete}
              >
                Delete
              </Button>
              <br />
              <Button
                color="primary"
                variant="contained"
                size="large"
                startIcon={<CancelIcon />}
                onClick={cancelDelete}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
