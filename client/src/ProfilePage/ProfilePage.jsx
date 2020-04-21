import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { getSecret } from "../auth/helpers";
import MaterialCard2 from "../components/Material/MaterialCard";
import StackGrid from "react-stack-grid";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: "70px"
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default () => {
  const classes = useStyles();
  var id = localStorage.getItem("USER_ID");
  const [userMaterials, setUserMaterials] = useState([]);
  const cardWidth = document.documentElement.clientWidth < 600 ? "100%" : 250;

  useEffect(() => {
    //get all Materials where author id === user id
    if (id !== undefined) {
      //console.log("edit material - ", id);
      fetch("/api/materials/" + id, {
        method: "GET"
      })
        .then(response => response.json())

        .then(resultData => {
          //console.log("resultData", resultData);
          setUserMaterials(resultData);
        });
    }
  }, []);

  const handleMyMaterials = event => {
    console.log("herer");
  };

  const handleMyLikes = event => {
    console.log("herer");
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

        <Typography gutterBottom variant="h5" component="h5">
          Materials I Have Made
        </Typography>

        <StackGrid columnWidth={cardWidth} gutterWidth={5} gutterHeight={10}>
          {userMaterials.map((material, index) => (
            <MaterialCard2 material={material} index={index} />
          ))}
        </StackGrid>
      </div>
    );
  } else {
    return (
      <div>
        <Typography gutterBottom variant="h4" component="h1">
          {localStorage.getItem("USER_NAME")}'s Profile
        </Typography>
        <Typography gutterBottom variant="body" component="body">
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

const styles = {
  paperCenter: {
    width: "91%",
    margin: "10px auto",
    padding: "10px"
  },
  button: {
    margin: 15
  },
  p_wrap: {
    whiteSpace: "pre-line"
  },
  selectSpans: {
    display: "block"
  },
  card: {
    margin: "10px auto"
  }
};
