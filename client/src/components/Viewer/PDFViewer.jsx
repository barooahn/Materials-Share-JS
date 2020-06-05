import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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

export default ({ file }) => {
  const classes = useStyles();
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  const pdfWidth = window.screen.width * 0.9;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  console.log("PDFViewer: called");

  const onChangePDFpage = (e, page) => {
    console.log("Docviewer - onChangePDFpage", page);
    setPageNumber(page);
  };

  return (
    <div className={classes.doc}>
      <React.Fragment>
        <Document
          file={file}
          className={classes.page}
          onLoadSuccess={onDocumentLoadSuccess}
          // renderMode="svg"
        >
          <Page size="A4" pageNumber={pageNumber} width={pdfWidth}></Page>
        </Document>
        {numPages > 1 ? (
          <Pagination count={numPages} onChange={onChangePDFpage} />
        ) : null}
      </React.Fragment>
    </div>
  );
};
