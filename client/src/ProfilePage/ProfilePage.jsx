import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
// import { getSecret } from "../auth/helpers";
import MaterialCard from "../components/Material/MaterialCard";
import StackGrid from "react-stack-grid";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import {
  getPaginatedUserMaterials,
  getUserLikes,
} from "../actions/materials-share-actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Mobile from "../components/helpers/mobile";
import debounce from "lodash.debounce";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "70px",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
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

export default () => {
  const classes = useStyles();
  const id = localStorage.getItem("USER_ID");
  const [userMaterials, setUserMaterials] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [showLikes, setshowLikes] = useState([false]);
  const cardWidth = Mobile() ? "100%" : 250;
  const [gettingSearchResults, setGettingSearchResults] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [totalMaterials, setTotalMaterials] = React.useState(0);

  const limit = Mobile() ? 4 : 10;

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

    if (height + top >= offsetH) {
      if (userMaterials.length >= totalMaterials) {
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
      let resultData = await getPaginatedUserMaterials(id, page, limit);

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

    fetchData();
  }, [id, page]);

  // React.useEffect(() => {
  //   async function fetchData() {
  //     handleMyLikes();
  //   }

  //   fetchData();
  // }, [page]);

  const handleMyLikes = async () => {
    // console.log("Likes");
    setshowLikes(false);
    setGettingSearchResults(true);
    const resultData = await getUserLikes(id, page, limit);
    console.log("ProfilePage: retults data", resultData.materials.length);
    if (resultData.materials) {
      setUserLikes([...userLikes, ...resultData.materials]);
      setGettingSearchResults(false);
    }
  };

  const handleMyMaterials = () => {
    // console.log("herer");
    setshowLikes(true);
  };

  const showTabs = () => {
    if (!showLikes) {
      return (
        <div>
          {gettingSearchResults ? (
            <div className={classes.circularProgress}>
              <CircularProgress size={40} color="secondary" />
            </div>
          ) : null}
          <Typography gutterBottom variant="h5" component="h5">
            Materials I Like
          </Typography>

          <StackGrid columnWidth={cardWidth} gutterWidth={5} gutterHeight={10}>
            {userLikes.map((material, index) => (
              <MaterialCard
                material={material}
                setMaterials={setUserMaterials}
                materials={userMaterials}
                index={index}
                key={material.title + Date.now()}
              />
            ))}
          </StackGrid>
          {gettingSearchResults && (
            <div className={classes.info}>Loading...</div>
          )}
          {!hasMore && (
            <div className={classes.info}>You did it! You reached the end!</div>
          )}
        </div>
      );
    } else {
      // console.log("Profilepage- userlikes ", userLikes);
      return (
        <div>
          {gettingSearchResults ? (
            <div className={classes.circularProgress}>
              <CircularProgress size={40} color="secondary" />
            </div>
          ) : null}
          <Typography gutterBottom variant="h5" component="h5">
            Materials I Have Made
          </Typography>

          <StackGrid columnWidth={cardWidth} gutterWidth={5} gutterHeight={10}>
            {userMaterials.map((material, index) => (
              <MaterialCard
                key={material.title + Date.now()}
                material={material}
                setMaterials={setUserMaterials}
                materials={userMaterials}
                index={index}
              />
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
      );
    }
  };

  //console.log("ProfilePage  materials", userMaterials);
  if (userMaterials.length > 0) {
    return (
      <div className={classes.root}>
        <Typography gutterBottom variant="h4" component="h1">
          {localStorage.getItem("USER_NAME")}'s Profile
        </Typography>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={handleMyMaterials}
          size="large"
          startIcon={
            <Avatar
              alt={localStorage.getItem("USER_NAME")}
              src={localStorage.getItem("USER_IMG")}
              className={(classes.orange, classes.small)}
            />
          }
        >
          My Materials
        </Button>

        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={handleMyLikes}
          size="large"
          startIcon={<FavoriteIcon fontSize="large" color="secondary" />}
        >
          My Likes
        </Button>

        {showTabs()}
      </div>
    );
  } else {
    return (
      <div>
        <Typography gutterBottom variant="h4" component="h1">
          {localStorage.getItem("USER_NAME")}'s Profile
        </Typography>
        <Typography gutterBottom variant="body1">
          Add or like resources to see them here
        </Typography>
      </div>
    );
  }
};

//   showData = async () => {
//     const data = await getSecret();
//     await console.log(data);
//     await this.setState({ data: data });
//   };
