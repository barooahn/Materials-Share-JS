import React, { Component } from "react";
import MaterialCard2 from "./MaterialCard2";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import StackGrid from "react-stack-grid";

const Materials = () => {
  const [materials, setMaterials] = React.useState([]);

  React.useEffect(() => {
    // do stuff here...
    //get all Materials from db setMaterials
    fetch(`/api/materials`, {
      method: "GET"
    })
      .then(response => response.json())

      .then(resultData => {
        {
          resultData.forEach(material => {
            material.files = Array.isArray(material.files)
              ? [material.files[0]]
              : [material.files];
          });
        }
        setMaterials(resultData);
      });
  }, []);

  return (
    <div id="cards" style={{ width: "100%" }}>
      <Typography gutterBottom variant="h4" component="h1">
        Teaching Material
      </Typography>
      <StackGrid columnWidth={350}>
        {materials.map((material, index) => (
          // <Grid key={material.title} item xs={12} md={6} lg={3} >
          // <div id="card" style={{}}>
            <MaterialCard2 material={material} index={index} />
          // </div>
          // </Grid>
        ))}
      </StackGrid>
    </div>
  );
};

export default Materials;
