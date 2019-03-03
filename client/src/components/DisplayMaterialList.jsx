import React from "react";
import { Grid, List, ListItem, ListItemText } from "@material-ui/core";
import GetFilledProps from "./GetFilledProps";

const DisplayMaterialList = props => {
  console.log(" props ", props);
  let filledValues = GetFilledProps(props);

  const gridItems = filledValues.map(resource => {
    // console.log("resource ", resource);
    const label = resource.label;
    const value = resource.value;
    //console.log("final value ", value);

    return (
      <Grid item xs={12} md={6} key={Object.keys(resource)}>
        <List>
          <ListItem>
            <ListItemText
              style={styles.p_wrap}
              key={label}
              primary={label}
              secondary={
                <React.Fragment>
                  {Array.isArray(value) &&
                    value.map(x => {
                      return (
                        <span style={styles.selectSpans} key={x.label}>
                          {x.label}
                        </span>
                      );
                    })}
                  {!Array.isArray(value) && value}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Grid>
    );
  });
  console.log("display items ", gridItems);
  return gridItems;
};

const styles = {
  button: {
    margin: 15
  },
  p_wrap: {
    whiteSpace: "pre-line"
  },
  selectSpans: {
    display: "block"
  }
};

export default DisplayMaterialList;
