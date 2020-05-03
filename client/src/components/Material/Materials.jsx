import React from "react";
import MaterialCard from "./MaterialCard";
import Typography from "@material-ui/core/Typography";
import StackGrid from "react-stack-grid";
import { makeStyles } from "@material-ui/core/styles";
import { getAllMaterials } from "../../actions/materials-share-actions";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "70px",
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "47%",
    zIndex: 50,
  },
}));

const Materials = () => {
  const classes = useStyles();
  const [materials, setMaterials] = React.useState([]);
  const [gettingSearchResults, setGettingSearchResults] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      setGettingSearchResults(true);
      let resultData = await getAllMaterials();
      resultData.forEach((material) => {
        material.files = Array.isArray(material.files)
          ? [material.files[0]]
          : [material.files];
      });
      setMaterials(resultData);
      setGettingSearchResults(false);
    }

    fetchData();
  }, []);

  const cardWidth = document.documentElement.clientWidth < 600 ? "100%" : 250;

  return (
    <div className={classes.root}>
      {gettingSearchResults ? (
        <div className={classes.circularProgress}>
          <CircularProgress size={40} color="secondary" />
        </div>
      ) : null}
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
