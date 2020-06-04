import React from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
const mammoth = require("mammoth");

const useStyles = makeStyles((theme) => ({
  "@global": {
    img: {
      maxWidth: "100%",
    },

    canvas: {
      maxWidth: "100%",
      width: "auto !important",
      height: "auto !important",
      overflow: "hidden",
    },
  },
}));

export default ({ file, index }) => {
  const classes = useStyles();

  useEffect(() => {
    const jsonFile = new XMLHttpRequest();
    jsonFile.open("GET", file, true);
    jsonFile.send();
    jsonFile.responseType = "arraybuffer";
    jsonFile.onreadystatechange = () => {
      if (jsonFile.readyState === 4 && jsonFile.status === 200) {
        mammoth
          .convertToHtml(
            { arrayBuffer: jsonFile.response },
            { includeDefaultStyleMap: true }
          )
          .then((result) => {
            const docEl = document.createElement("div");
            docEl.innerHTML = result.value;
            if (document.getElementById(`docViewer-${index}`))
              document.getElementById(`docViewer-${index}`).innerHTML =
                docEl.outerHTML;
          })
          .catch((err) => {
            console.log("WordViewer: something went wrong", err);
          })
          .done();
      }
    };
  }, [index]);

  return (
    <div className={classes.doc} id={`docViewer-${index}`}>
      <p>Loading...</p>
    </div>
  );
};
