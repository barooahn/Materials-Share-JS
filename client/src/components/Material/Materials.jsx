import React from "react";
import MaterialCard from "./MaterialCard";
import Typography from "@material-ui/core/Typography";
import StackGrid from "react-stack-grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: "70px"
  },
}));

const Materials = () => {
  const classes = useStyles();
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
    <div className={classes.root}>
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
    </div>
  );
};

export default Materials;
