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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    display: "flex",
  },
  papperCenter: {
    marginBottom: 50,
  },
  media: {
    // paddingTop: "56.25%", // 16:9
    width: "100%",
    maxWidth: 1000,
    paddingBottom: 5,
  },
}));

export default ({ setMaterials, materials }) => {
  const classes = useStyles();
  const { id } = useParams();
  const [material, setMaterial] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [likes, setLikes] = React.useState(material.likes || []);
  const author = localStorage.getItem("USER_ID");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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

  React.useEffect(() => {
    //get all Materials from db setMaterials
    if (id !== undefined) {
      async function fetchData(id) {
        const resultData = await getMaterial(id);
        setMaterial(resultData);
      }
      fetchData(id);
      // });
    }
  }, [id]);

  const handleDeleteMaterial = () => {
    console.log("in card menu delte", material);
    DeleteMaterial(material._id);
    setMaterials(materials.filter((m) => m._id !== material._id));
  };

  return (
    <Paper className="paperCenter" elevation={1}>
      <Typography gutterBottom variant="h2" component="h2" align="center">
        {material.title}
      </Typography>
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
      <SocialShare handleClose={handleClose} open={open} />
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

      <Grid container spacing={1}>
        <List>
          <ListItem>
            <div className={classes.media}>
              {material.files
                ? material.files.map((file) => (
                    <Viewer key={file} file={file} />
                  ))
                : null}
            </div>
          </ListItem>
        </List>

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
      </Grid>
    </Paper>
  );
};
