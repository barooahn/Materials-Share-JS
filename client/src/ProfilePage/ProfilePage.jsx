import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { getSecret } from "../auth/helpers";
import Material from "../components/Material/Material";
import MaterialCard from "../components/Material/MaterialCard";

export default () => {
  var id = localStorage.getItem("USER_ID");
  const [userMaterials, setUserMaterials] = useState([]);

  useEffect(() => {
    //get all Materials from db setMaterials
    if (id !== undefined) {
      console.log("edit material - ", id);
      fetch("/api/materials/" + id, {
        method: "GET"
      })
        .then(response => response.json())

        .then(resultData => {
          console.log("resultData", resultData);
          setUserMaterials(resultData);
        });
    }
  }, []);

  const handleClick = material => {
    this.setState({ material: true, materialDetails: material });
  };

  console.log("ProfilePage  materials", userMaterials);
  if (userMaterials.length > 0) {
    return (
      <Paper style={styles.paperCenter} elevation={1}>
        <Typography gutterBottom variant="h4" component="h1">
          My Profile
        </Typography>
        <Typography gutterBottom variant="h5" component="h5">
          Materials I Have Made
        </Typography>
        <Grid container spacing={16}>
          {userMaterials.map(material => (
            <Grid key={userMaterials.title} item xs={12} md={6}>
              {console.log("material ", material)}
              <MaterialCard
                style={styles.card}
                material={material}
                onClick={handleClick}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  } else {
    return <div>here</div>;
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
