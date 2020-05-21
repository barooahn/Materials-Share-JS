import React from "react";
import { useEffect } from "react";
import { Document, Page } from "react-pdf";
import Pagination from "@material-ui/lab/Pagination";
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
    },
  },
}));

export default ({ file, ext, randId }) => {
  const classes = useStyles();
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onChangePDFpage = (e, page) => {
    console.log("Docviewer - onChangePDFpage", page);
    setPageNumber(page);
  };

  useEffect(() => {
    // console.log("DocViewer: in Useeffect file", file);
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
              docEl.innerHTML = result.value;
              // console.log("DocViewer: key", randId);
              if (document.getElementById(randId))
                document.getElementById(randId).innerHTML = docEl.outerHTML;
              // setDoc("");
            })
            .catch((err) => {
              console.log("DocViewer: something went wrong", err);
            })
            .done();
        }
      };
    }
  }, []);

  return (
    <div className={classes.doc} id={randId}>
      {ext === "pdf" ? (
        <React.Fragment>
          <Document
            file={file}
            className={classes.page}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <Pagination count={numPages} onChange={onChangePDFpage} />
        </React.Fragment>
      ) : null}
    </div>
  );
};
