import React from "react";
import VideoFile from "./VideoFile";
import PDFViewer from "./PDFViewer";
import WordViewer from "./WordViewer";
import { fileExistsOnS3 } from "../helpers/fileExistsOnS3";

const Viewer = ({
	file,
	ext = null,
	thumb = null,
	index,
	printPDF,
	setPrintReady,
}) => {
	const [hasPDF, setHasPDF] = React.useState(false);

	file = thumb !== null ? thumb : file;

	const addDefaultSrc = (ev) => {
		ev.target.src = "./img/mediaNotReady.png";
	};

	React.useEffect(() => {
		if (ext === "docx" && thumb === null) {
			fileExistsOnS3(file + ".pdf").then((pdf) => {
				setHasPDF(pdf.signedUrl);
			});
		}
	}, [hasPDF]);

	if (ext === null) {
		const reExtension = /(?:\.([^.]+))?$/;
		ext = file.match(reExtension)[1].toLowerCase();
	}

	switch (ext) {
		case "docx":
			if (hasPDF) {
				return (
					<PDFViewer
						key={file + Date.now() + ".pdf"}
						file={file + ".pdf"}
						printPDF={printPDF}
						setPrintReady={setPrintReady}
					/>
				);
			} else {
				return (
					<WordViewer
						key={file + Date.now()}
						file={file}
						index={index}
					/>
				);
			}

		case "pdf":
			return (
				<PDFViewer
					key={file + Date.now()}
					file={file}
					printPDF={printPDF}
					setPrintReady={setPrintReady}
				/>
			);
		case "jpg":
		case "jpeg":
		case "svg":
		case "png":
			const mediaStyle = {
				width: "100%",
				height: "auto",
			};
			return (
				<img
					style={mediaStyle}
					key={file}
					alt={file}
					src={file}
					onError={addDefaultSrc}
				/>
			);
		default:
			return <VideoFile key={file} file={file} />;
	}
};
export default Viewer;
