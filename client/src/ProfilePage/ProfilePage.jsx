import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
// import { getSecret } from "../auth/helpers";
import MaterialCard2 from "../components/Material/MaterialCard";
import StackGrid from "react-stack-grid";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
// import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import {
  getUserMaterials,
  getUserLikes,
} from "../actions/materials-share-actions";
import CircularProgress from "@material-ui/core/CircularProgress";

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
}));

export default () => {
  const classes = useStyles();
  const id = localStorage.getItem("USER_ID");
  const [userMaterials, setUserMaterials] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [showLikes, setshowLikes] = useState([false]);
  const cardWidth = document.documentElement.clientWidth < 600 ? "100%" : 250;
  const [gettingSearchResults, setGettingSearchResults] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      setGettingSearchResults(true);
      let resultData = await getUserMaterials(id);
      if (resultData) {
        resultData.forEach((material) => {
          material.files = Array.isArray(material.files)
            ? [material.files[0]]
            : [material.files];
        });
        setUserMaterials(resultData);
        setGettingSearchResults(false);
      }
    }

    fetchData();
  }, [id]);

  const handleMyMaterials = () => {
    // console.log("herer");
    setshowLikes(true);
  };

  const handleMyLikes = async () => {
    // console.log("Likes");
    setshowLikes(false);
    setGettingSearchResults(true);
    const resultData = await getUserLikes(id);
    if (resultData) {
      setUserLikes(resultData);
      setGettingSearchResults(false);
    }
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
              <MaterialCard2 material={material} index={index} />
            ))}
          </StackGrid>
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
              <MaterialCard2 material={material} index={index} key={index} />
            ))}
          </StackGrid>
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
