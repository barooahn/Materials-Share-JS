import React from "react";
import { useLocation } from "react-router-dom";
import MaterialCard from "../Material/MaterialCard";
import Typography from "@material-ui/core/Typography";
import StackGrid from "react-stack-grid";

export default () => {
  let location = useLocation();

  const [materials, setMaterials] = React.useState([]);

  React.useEffect(() => {
    let resultData = location.state.searchResults;

    resultData.forEach(material => {
      material.files = Array.isArray(material.files)
        ? [material.files[0]]
        : [material.files];
    });

    setMaterials(resultData);
  }, [location.state.searchResults]);

  const cardWidth = document.documentElement.clientWidth < 600 ? "100%" : 250;

  return (
    <React.Fragment>
      <Typography gutterBottom variant="h2" component="h2" align="center">
        Teaching Resorces
      </Typography>
      <StackGrid columnWidth={cardWidth} gutterWidth={10} gutterHeight={10}>
        {materials.map((material, index) => (
          <MaterialCard
            key={material._id}
            material={material}
            index={index}
            setMaterials={setMaterials}
            materials={materials}
          />
        ))}
      </StackGrid>
    </React.Fragment>
  );
};
