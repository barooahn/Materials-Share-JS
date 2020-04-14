import React from "react";
import {
  BrowserRouter as Router,
  useParams,
  withRouter
} from "react-router-dom";

const DeleteMaterial = withRouter(({ history }) => {
  const { id } = useParams();

  React.useEffect(() => {
    if (id !== undefined) {
      //get material
      fetch(`/api/material/${id}`, {
        method: "GET"
      })
        .then(response => response.json())

        .then(resultData => {
          //remove files
          resultData.files.forEach(file => {
            var removeAmazon = file.split("/uploads").pop();
            removeAmazon = "uploads" + removeAmazon;

            fetch(`/api/material/file/delete`, {
              headers: {
                "Content-Type": "application/json"
              },
              method: "DELETE",
              body: JSON.stringify({ file: removeAmazon }) // body data type must match "Content-Type" header
            });
          });
          //delete Material
          fetch(`/api/material/delete/${id}`, {
            headers: {
              "Content-Type": "application/json"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: "DELETE"
          })
            .then(response => response.json())

            .then(resultData3 => {
              console.log("file deleted", resultData3);
            });
        });
    }
  }, []);

  return <div></div>;
});
export default DeleteMaterial;
