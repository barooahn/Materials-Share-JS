import React, { useEffect, useMemo } from "react";
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
      maxWidth: "100% !important",
      width: "100% !important",
      height: "auto !important",
      overflow: "hidden",
    },
  },
}));

export default ({ file, printPDF, setPrintReady }) => {
  const classes = useStyles();
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pdfView, setPdfView] = React.useState(<div></div>);

  const pdfWidth = window.screen.width * 0.9;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onChangePDFpage = (e, page) => {
    setPageNumber(page);
  };

  // React.useEffect(() => {
  //   //get all Materials from db setMaterials\
  //   if (printPDF) {
  //     console.log("pdf viewer printPDF true", printPDF);
  //     setPdfView(
  //       <div className={classes.doc}>
  //         <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
  //           {Array.from(new Array(numPages), (el, index) => (
  //             <Page key={`page_${index + 1}`} pageNumber={index + 1} />
  //           ))}
  //         </Document>
  //       </div>
  //     );
  //     setPrintReady(true);
  //   } else {
  //     console.log("pdf viewer printPDF false", printPDF);
  //     console.log("pdf viewer numPages", numPages);
  //     setPdfView(
  //       <div className={classes.doc}>
  //         <React.Fragment>
  //           <Document
  //             file={file}
  //             className={classes.page}
  //             onLoadSuccess={onDocumentLoadSuccess}
  //             renderMode="canvas">
  //             <Page size="A4" pageNumber={pageNumber} maxWidth={"100%"}></Page>
  //           </Document>
  //           {numPages > 1 ? (
  //             <Pagination count={numPages} onChange={onChangePDFpage} />
  //           ) : null}
  //         </React.Fragment>
  //       </div>
  //     );
  //     setPrintReady(false);
  //   }
  // }, [printPDF, numPages, pageNumber]);


  React.useEffect(() => {
    //get all Materials from db setMaterials\

      setPdfView(
        <div className={classes.doc}>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      );

  }, [printPDF, numPages, pageNumber]);
  return pdfView;
};
