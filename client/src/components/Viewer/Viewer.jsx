import React from "react";
import VideoFile from "./VideoFile";
import PDFViewer from "./PDFViewer";
import WordViewer from "./WordViewer";

export default ({ file, ext = null, thumb = null, index }) => {
  // console.log(" Viewer- ext", ext);
  file = thumb !== null ? thumb : file;

  if (ext === null) {
    const reExtension = /(?:\.([^.]+))?$/;
    ext = file.match(reExtension)[1].toLowerCase();
  }

  switch (ext) {
    case "docx":
      console.log("Viewer: Word Doc found");
      return <WordViewer key={file + Date.now()} file={file} index={index} />;
    case "pdf":
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
      console.log("Viewer: Img found");
      return <img style={mediaStyle} key={file} alt={file} src={file} />;
    default:
      console.log("Viewer: Video found");
      return <VideoFile key={file} file={file} />;
  }
};
