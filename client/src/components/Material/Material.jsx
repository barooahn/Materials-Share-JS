import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Viewer from "../Viewer/Viewer";
import DisplayMaterialList from "./DisplayMaterialList";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { getMaterial } from "../../actions/materials-share-actions";
import SocialShare from "./SocialShare";
import ToggleLikes from "../helpers/ToggleLikes";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Link } from "react-router-dom";
import DeleteMaterial from "../helpers/DeleteMaterial";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import CancelIcon from "@material-ui/icons/Cancel";
import PrintIcon from "@material-ui/icons/Print";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    display: "flex",
  },
  paperCenter: {
    marginBottom: 50,
  },
  media: {
    // paddingTop: "56.25%", // 16:9
    width: "100%",
    maxWidth: 1000,
    paddingBottom: 5,
    pageBreakBefore: "always",
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
  pageBreak: {
    pageBreakBefore: "always",
  },
}));

export default () => {
  const classes = useStyles();
  let history = useHistory();
  const { slug } = useParams();
  const [material, setMaterial] = React.useState([]);
  const [likes, setLikes] = React.useState(material.likes || []);
  const author = localStorage.getItem("USER_ID");

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
    history.push("/materials");
  };

  //Share model stuff
  const [shareOpen, setShareOpen] = React.useState(false);
  const handleShareOpen = () => {
    setShareOpen(true);
  };

  const handleShareClose = () => {
    setShareOpen(false);
  };

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

  const print = () => {
    window.print();
  };

  React.useEffect(() => {
    //get all Materials from db setMaterials
    if (slug !== undefined) {
      getMaterial(slug).then((resultData) => {
        setMaterial(resultData[0]);
      });
    }
  }, [slug]);

  return (
    <Paper className={classes.paperCenter} elevation={1}>
      <Typography gutterBottom variant="h2" component="h2" align="center">
        {material.title}
      </Typography>
      <Box display="block" displayPrint="none">
        <Tooltip
          title={!author ? "Login to add to likes" : "Add to likes"}
          placement="top"
        >
          <span>
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
          </span>
        </Tooltip>
        <Tooltip title={!author ? "Login to print" : "Print"} placement="top">
          <span>
            <IconButton
              aria-label="add to favorites"
              onClick={print}
              color={setLikesColour()}
              disabled={!author}
            >
              <PrintIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Share on social media" placement="top">
          <span>
            <IconButton aria-label="share" onClick={handleShareOpen}>
              <ShareIcon />
            </IconButton>
          </span>
        </Tooltip>
        <SocialShare
          handleShareClose={handleShareClose}
          shareOpen={shareOpen}
        />
        {author === material.author_id ? (
          <React.Fragment>
            <Tooltip title="Edit your material" placement="top">
              <span>
                <IconButton component={Link} to={"/edit/" + material._id}>
                  <EditIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Delete your material" placement="top">
              <span>
                <IconButton onClick={(event) => handleDeleteMaterial(event)}>
                  <DeleteForeverIcon />
                </IconButton>
              </span>
            </Tooltip>
          </React.Fragment>
        ) : null}
      </Box>

      <Grid container spacing={0}>
        <List>
          <ListItem>
            <div className={classes.media}>
              {material.files
                ? material.files.map((file) => (
                    <Viewer key={file + Date.now()} file={file} />
                  ))
                : null}
            </div>
          </ListItem>
          <hr />
        </List>
      </Grid>
      <div className={classes.pageBreak}>
        <Typography gutterBottom variant="h4" component="h4" align="center">
          Teacher Notes
        </Typography>
        {DisplayMaterialList(material)}
        {typeof variable !== "undefined" && material.book.title !== "" ? (
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Material used in conjuction with text book"
                  secondary={
                    <React.Fragment>
                      {material.book.title}
                      {" - Page " + material.book.page}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        ) : null}
      </div>
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
    </Paper>
  );
};
