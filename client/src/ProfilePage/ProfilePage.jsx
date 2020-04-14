import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { getSecret } from "../auth/helpers";
import MaterialCard2 from "../components/Material/MaterialCard";
import StackGrid from "react-stack-grid";

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

  console.log("ProfilePage  materials", userMaterials);
  if (userMaterials.length > 0) {
    return (
      <div>
        <Typography gutterBottom variant="h4" component="h1">
          My Profile
        </Typography>
        <Typography gutterBottom variant="h5" component="h5">
          Materials I Have Made
        </Typography>

        <StackGrid columnWidth={350} gutterWidth={5} gutterHeight={10}>
          {userMaterials.map((material, index) => (
            <MaterialCard2 material={material} index={index} />
          ))}
        </StackGrid>
      </div>
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
