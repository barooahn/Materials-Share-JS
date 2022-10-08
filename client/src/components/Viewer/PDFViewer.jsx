import React, { useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Pagination from "@mui/lab/Pagination";
import { makeStyles } from "@mui/styles";
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

const PDFViewer = ({ file, printPDF, setPrintReady }) => {
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

	React.useEffect(() => {
		//get all Materials from db setMaterials\

		setPdfView(
			<div className={classes.doc}>
				<Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
					{Array.from(new Array(numPages), (el, index) => (
						<Page
							key={`page_${index + 1}`}
							pageNumber={index + 1}
						/>
					))}
				</Document>
			</div>
		);
	}, [printPDF, numPages, pageNumber]);
	return pdfView;
};
export default PDFViewer;
