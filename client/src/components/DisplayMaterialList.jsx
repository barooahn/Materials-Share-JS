import React from "react";
import { Grid, List, ListItem, ListItemText } from "@material-ui/core";

const titles = [
  { title: "Title" },
  { timeInClass: "Time In Class (mins)" },
  { procedureBefore: "Procedure Before Class" },
  { procedureIn: "Procedure In The Classroom" },
  { followUp: "Follow Up Activities" },
  { variations: "Variations On The Resource" },
  { tips: "Tips" },
  { notes: "Notes" },
  { category: "Institute" },
  { objective: "Objective" },
  { level: "Level" },
  { languageFocus: "Language Focus" },
  { pupilTask: "Tasks For Pupils" },
  { activityUse: "Activity Use" },
  { materials: "Materials needed" },
  { preparation: "Time Needed For Preperation (mins)" }
];

const getLabel = name => {
  const label = titles.filter(x => name in x);
  //   console.log("label ", label[0][name]);
  return label[0][name];
};

const getFilledProps = props => {
  //   console.log("props", props);
  let filled = [];

  for (var item in props) {
    if (
      props[item] !== "" &&
      props[item] !== undefined &&
      props[item] !== null &&
      props[item] !== 0 &&
      props[item].length > 0 &&
      item !== "files" &&
      item !== "_id" &&
      item !== "dateCreated" &&
      item !== "dateModified" &&
      item !== "book" &&
      item !== "author" &&
      item !== "shared" &&
      item !== "filePaths" &&
      item !== "showContinue" &&
      item !== "selectedFiles" &&
      item !== "showUpload" &&
      item !== "loaded" &&
      item !== "comments"
    ) {
      const label = getLabel(item);
      filled.push({ [label]: props[item] });
    }
  }

  console.log("filled... ", filled);
  return filled;
};

const DisplayMaterialList = props => {
  let filledValues = getFilledProps(props);

  const gridItems = filledValues.map(resource => {
    console.log("resource ", resource);
    const label = Object.keys(resource);
    const value = resource[label];
    console.log("final value ", value);

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
