import React from "react";
import MaterialCard from "./MaterialCard";
import Typography from "@material-ui/core/Typography";
import StackGrid from "react-stack-grid";
import { makeStyles } from "@material-ui/core/styles";
import { getPaginatedMaterials } from "../../actions/materials-share-actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import debounce from "lodash.debounce";

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
  const [page, setPage] = React.useState(0);
  const [totalMaterials, setTotalMaterials] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);
  const [error, setError] = React.useState(false);

  const limit = 10;

  window.onscroll = debounce(() => {
    if (error || gettingSearchResults || !hasMore) return;
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (materials.length >= totalMaterials) {
        setHasMore(false);
        return;
      } else {
        let nextpage = page + 1;
        setPage(nextpage);
      }
    }
  }, 100);

  React.useEffect(() => {
    async function fetchData() {
      setGettingSearchResults(true);
      console.log("MAterials useEffect - page number ", page);
      let resultData = await getPaginatedMaterials(page, limit);
      console.log(resultData);
      setTotalMaterials(resultData.total);
      await resultData.materials.forEach((material) => {
        material.files = Array.isArray(material.files)
          ? [material.files[0]]
          : [material.files];
      });
      setMaterials([...materials, ...resultData.materials]);
      setGettingSearchResults(false);
    }

    fetchData();
  }, [page]);

  // const fetchMoreData = () => {
  //   if (materials.length >= materials.total) {
  //     setHasMore(false);
  //     return;
  //   }
  //   console.log("MAterials fetchMoreData - page number ", page);
  //   let nextpage = page + 1;
  //   setPage(nextpage);
  //   console.log("Materials fetch more page", page);
  // };

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
      {error && <div style={{ color: "#900" }}>{error}</div>}
      {gettingSearchResults && <div>Loading...</div>}
      {!hasMore && <div>You did it! You reached the end!</div>}
    </div>
  );
};

export default Materials;
