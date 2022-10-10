import React from "react";
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

const PDFViewer = ({ file }) => {
	const classes = useStyles();
	const [numPages, setNumPages] = React.useState(1);
	const [pageNumber, setPageNumber] = React.useState(1);
	const [pdfView, setPdfView] = React.useState(<div></div>);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	const onChangePDFpage = (e, page) => {
		setPageNumber(page);
	};

	React.useEffect(() => {
		setPdfView(
			<div className={classes.doc}>
				<Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
					<>
						<Page pageNumber={pageNumber} />
						<Pagination
							onChange={onChangePDFpage}
							count={numPages}
						/>
					</>
				</Document>
			</div>
		);
	}, [numPages, pageNumber]);
	return pdfView;
};
export default PDFViewer;
