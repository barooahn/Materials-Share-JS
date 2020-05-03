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

export default () => {
  const classes = useStyles();
  const { id } = useParams();
  const [material, setMaterial] = React.useState([]);

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

  return (
    <Paper className="paperCenter" elevation={1}>
      <Typography gutterBottom variant="h2" component="h2" align="center">
        {material.title}
      </Typography>
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
