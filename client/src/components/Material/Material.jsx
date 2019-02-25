import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from "@material-ui/core";
import Viewer from "../Viewer/Viewer";
import DisplayMaterialList from "../DisplayMaterialList";

const Material = props => {
  const { material } = props;
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
              {material.files.map(file => (
                <Viewer key={file} file={file} />
              ))}
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

export default Material;
