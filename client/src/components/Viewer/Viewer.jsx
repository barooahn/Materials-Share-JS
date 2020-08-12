import React from "react";
import VideoFile from "./VideoFile";
import PDFViewer from "./PDFViewer";
import WordViewer from "./WordViewer";
import { fileExistsOnS3 } from "../helpers/fileExistsOnS3";

export default ({ file, ext = null, thumb = null, index }) => {
  const [hasPDF, sethasPDF] = React.useState(false);

  // console.log(" Viewer- ext", ext);
  file = thumb !== null ? thumb : file;

  const addDefaultSrc = (ev) => {
    ev.target.src = "./img/mediaNotReady.png";
  };

  React.useEffect(() => {
    fileExistsOnS3(file + ".pdf").then((pdf) => {
      sethasPDF(pdf.signedUrl);
    });
  }, []);

  if (ext === null) {
    const reExtension = /(?:\.([^.]+))?$/;
    ext = file.match(reExtension)[1].toLowerCase();
    // dealWithFile(ext);
  }
  // const dealWithFile = async (ext) => {
  switch (ext) {
    case "docx":
      console.log("hasPDDF", hasPDF.signedUrl);
      if (hasPDF) {
        return (
          <PDFViewer key={file + Date.now() + ".pdf"} file={file + ".pdf"} />
        );
      } else {
        return <WordViewer key={file + Date.now()} file={file} index={index} />;
      }
    case "pdf":
      console.log("ext", ext);
      console.log("Viewer: PDF found");
      return <PDFViewer key={file + Date.now()} file={file} />;

    case "jpg":
    case "jpeg":
    case "svg":
    case "png":
      const mediaStyle = {
        width: "100%",
        height: "auto",
      };
      // console.log("Viewer: Img found");
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
      // console.log("Viewer: Video found");
      return <VideoFile key={file} file={file} />;
    // }
  }
};
