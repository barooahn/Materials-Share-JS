import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
// import { getSecret } from "../auth/helpers";
import MaterialCard from "../components/Material/MaterialCard";
import StackGrid from "react-stack-grid";
import { makeStyles } from "@material-ui/core/styles";
import { getPaginatedUserMaterials } from "../actions/materials-share-actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import debounce from "lodash.debounce";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "70px",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "47%",
    zIndex: 50,
  },
  info: {
    textAlign: "center",
    margin: 10,
  },
}));

export default (props) => {
  const classes = useStyles();

  const [gettingSearchResults, setGettingSearchResults] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [totalMaterials, setTotalMaterials] = React.useState(0);
  const [userMaterials, setUserMaterials] = React.useState([]);

  window.onscroll = debounce(() => {
    if (error || gettingSearchResults || !hasMore) return;

    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    let top =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    let offsetH =
      document.body.offsetHeight || document.documentElement.offsetHeight;

    // console.log(
    //   "ProfileMyMaterials userMaterials.length , totalMaterials",
    //   userMaterials.length,
    //   totalMaterials
    );

    if (height + top >= offsetH) {
      if (userMaterials.length === totalMaterials.length) {
        setHasMore(false);
        return;
      } else {
        let nextpage = page + 1;
        setPage(nextpage);
        return;
      }
    }
  }, 300);

  React.useEffect(() => {
    async function fetchData() {
      let resultData = await getPaginatedUserMaterials(
        props.id,
        page,
        props.limit
      );
      // console.log("ProfileMyMaterials  resultData", resultData);
      if (resultData.materials) {
        setTotalMaterials(resultData.total);
        resultData.materials.forEach((material) => {
          material.files = Array.isArray(material.files)
            ? [material.files[0]]
            : [material.files];
        });
        setUserMaterials([...userMaterials, ...resultData.materials]);
        setGettingSearchResults(false);
      }
    }

    setGettingSearchResults(true);
    fetchData();
  }, [page]);

  return (
    <React.Fragment>
      {userMaterials.length > 1 ? (
        <div>
          {gettingSearchResults ? (
            <div className={classes.circularProgress}>
              <CircularProgress size={40} color="secondary" />
            </div>
          ) : null}
          <Typography gutterBottom variant="h5" component="h5">
            Materials I Have Made
          </Typography>

          <StackGrid
            columnWidth={props.cardWidth}
            gutterWidth={5}
            gutterHeight={10}
          >
            {userMaterials.map((material, index) => (
              //div important to stop flashing bug
              <div>
                <MaterialCard
                  key={material.title + Date.now()}
                  material={material}
                  setMaterials={setUserMaterials}
                  materials={userMaterials}
                  index={index}
                />
              </div>
            ))}
          </StackGrid>
          {error && (
            <div className={classes.info} style={{ color: "#900" }}>
              {error}
            </div>
          )}
          {gettingSearchResults && (
            <div className={classes.info}>Loading...</div>
          )}
          {!hasMore && (
            <div className={classes.info}>You did it! You reached the end!</div>
          )}
        </div>
      ) : (
        <div>
          <Typography gutterBottom variant="h4" component="h1">
            {localStorage.getItem("USER_NAME")}'s Profile
          </Typography>
          <Typography gutterBottom variant="body1">
            Add or like resources to see them here
          </Typography>
        </div>
      )}
    </React.Fragment>
  );
};
