import React from "react";
import { useLocation } from "react-router-dom";
import MaterialCard from "../Material/MaterialCard";
import Typography from "@material-ui/core/Typography";
import StackGrid from "react-stack-grid";
import Mobile from "../helpers/mobile";

export default () => {
  let location = useLocation();

  const [materials, setMaterials] = React.useState([]);

  React.useEffect(() => {
    if (location.state?.searchResults.length > 0) {
      console.log(
        "searchResults - location.state.searchResults",
        location.state.searchResults
      );
      let resultData = location.state.searchResults;

      resultData.forEach((material) => {
        material.files = Array.isArray(material.files)
          ? [material.files[0]]
          : [material.files];
      });

      setMaterials(resultData);
    }
  }, [location.state]);

  const cardWidth = Mobile() ? "100%" : 250;

  return (
    <React.Fragment>
      <Typography
        gutterBottom
        variant="h3"
        component="h3"
        align="center"
        name="searchResults"
      >
        Search Results
      </Typography>
      {materials.length > 0 ? (
        <React.Fragment>
          <Typography gutterBottom variant="body1" component="p" align="center">
            Results found {materials.length}
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
      ) : (
        <Typography gutterBottom variant="body1" component="p" align="center">
          Sorry there are no results
        </Typography>
      )}
    </React.Fragment>
  );
};
