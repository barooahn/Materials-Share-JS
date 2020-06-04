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
      return <WordViewer key={file + Date.now()} file={file} index={index} />;
    case "pdf":
      return <PDFViewer key={file + Date.now()} file={file} />;
    case "jpg":
    case "jpeg":
    case "svg":
    case "png":
      const mediaStyle = {
        width: "100%",
        height: "auto",
      };
      return <img style={mediaStyle} key={file} alt={file} src={file} />;
    default:
      return <VideoFile key={file} file={file} />;
  }

  // if (ext === null) {
  //   const reExtension = /(?:\.([^.]+))?$/;

  //   ext = file.match(reExtension)[1].toLowerCase();
  // }
  // if (ext === "docx") {
  //   return <WordViewer key={file + Date.now()} file={file} index={index} />;
  // } else if (ext === "pdf") {
  //   return <PDFViewer key={file + Date.now()} file={file} />;
  // } else if (
  //   ext === "jpg" ||
  //   ext === "jpeg" ||
  //   ext === "svg" ||
  //   ext === "png"
  // ) {
  //   const mediaStyle = {
  //     width: "100%",
  //     height: "auto",
  //   };
  //   return <img style={mediaStyle} key={file} alt={file} src={file} />;
  // } else {
  //   return <VideoFile key={file} file={file} />;
  // }
};

// export default Viewer;
