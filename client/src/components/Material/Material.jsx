import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Viewer from "../Viewer/Viewer";
import DisplayMaterialList from "./DisplayMaterialList";
import { BrowserRouter as Router, useParams } from "react-router-dom";

export default () => {
  const { id } = useParams();
  const [material, setMaterial] = React.useState([]);

  React.useEffect(() => {
    // do stuff here...
    //get all Materials from db setMaterials
    if (id !== undefined) {
      console.log("edit material - ", id);
      fetch(`/api/material/${id}`, {
        method: "GET"
      })
        .then(response => response.json())

        .then(resultData => {
          setMaterial(resultData);
        });
    }
  }, []);

  return (
    <Paper className="paperCenter" elevation={1}>
      <Typography variant="h4" component="h2">
        {material.title}
      </Typography>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <List>
            <ListItem>
              {/* <div className="attachement"> */}
              {material.files
                ? material.files.map(file => <div className="attachement"><Viewer key={file} file={file} /></div>)
                : null}
              {/* </div> */}
            </ListItem>
          </List>
        </Grid>

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
