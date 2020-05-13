import React from "react";
import MaterialCard from "./MaterialCard";
import Typography from "@material-ui/core/Typography";
import StackGrid from "react-stack-grid";
import { makeStyles } from "@material-ui/core/styles";
import { getPaginatedMaterials } from "../../actions/materials-share-actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [limit, setLimit] = React.useState(10);
  const [noMaterials, setNoMaterials] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      setGettingSearchResults(true);
      let resultData = await getPaginatedMaterials(page, limit);
      console.log(resultData);
      setNoMaterials(resultData.total);
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

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    let nextpage = page + 1;
    setPage(nextpage);
    console.log("Materials fetch more page", page);
  };

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
        <InfiniteScroll
          dataLength={noMaterials} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
          refreshFunction={fetchMoreData}
          pullDownToRefresh
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          {materials.map((material, index) => (
            <MaterialCard
              key={material._id}
              material={material}
              index={index}
              setMaterials={setMaterials}
              materials={materials}
            />
          ))}
        </InfiniteScroll>
      </StackGrid>
    </div>
  );
};

export default Materials;
