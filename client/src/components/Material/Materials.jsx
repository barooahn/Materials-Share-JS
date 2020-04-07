import React, { Component } from "react";
import MaterialCard from "./MaterialCard";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
              ? material.files[0]
              : material.files;
          });
        }
        setMaterials(resultData);
      });
  }, []);

  return (
    <div style={{ display: "flex " }}>
      <Typography gutterBottom variant="h4" component="h1">
        Teaching Material
      </Typography>

      {materials.map((material, index) => (
        <Grid key={material.title} item xs={12} md={6}>
          <MaterialCard material={material} index={index} />
        </Grid>
      ))}
    </div>
  );
};

export default Materials;
