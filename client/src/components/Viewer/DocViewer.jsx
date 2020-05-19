import React from "react";
import { Document, Page } from "react-pdf";
import { makeStyles } from "@material-ui/core/styles";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const mammoth = require("mammoth");

const useStyles = makeStyles((theme) => ({
  "@global": {
    img: {
      maxWidth: "100%",
    },

    canvas: {
      maxWidth: "100%",
    }
  },
}));

const DocViewer = ({ file, ext }) => {
  const classes = useStyles();
  const [doc, setDoc] = React.useState(<div>Loading...</div>);

  const randId =
    "wordDoc" +
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 12);

  React.useEffect(() => {
    if (ext === "docx") {
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
              docEl.className = "document-container";
              docEl.innerHTML = result.value;
              console.log("DocViewer: key", randId);
              document.getElementById(randId).innerHTML = docEl.outerHTML;
              // setDoc("");
            })
            .catch((err) => {
              console.log("DocViewer: something went wrong", err);
            })
            .done();
        }
      };
    } else if (ext === "pdf") {
      setDoc(
        <Document file={file} className={classes.page}>
          <Page pageNumber={1} />
        </Document>
      );
    } else setDoc(null);
  }, []);

  return (
    <div className={classes.doc} id={randId}>
      {doc}
    </div>
  );
};

export default DocViewer;
