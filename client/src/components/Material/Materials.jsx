import React, { Component } from "react";
import MaterialCard2 from "./MaterialCard";
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

  const cardWidth = document.documentElement.clientWidth < 600 ? "100%" : 250;

  return (
    <React.Fragment>
      <Typography gutterBottom variant="h2" component="h2" align="center">
        Teaching Resorces
      </Typography>
      <StackGrid columnWidth={cardWidth} gutterWidth={10} gutterHeight={10}>
        {materials.map((material, index) => (
          <MaterialCard2 material={material} index={index} />
        ))}
      </StackGrid>
    </React.Fragment>
  );
};

export default Materials;
