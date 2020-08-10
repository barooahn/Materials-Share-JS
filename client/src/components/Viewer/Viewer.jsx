import React from "react";
import VideoFile from "./VideoFile";
import PDFViewer from "./PDFViewer";
import WordViewer from "./WordViewer";
import { fileExistsOnS3 } from "../helpers/fileExistsOnS3";

export default ({ file, ext = null, thumb = null, index }) => {
  // console.log(" Viewer- ext", ext);
  file = thumb !== null ? thumb : file;


  const addDefaultSrc = (ev) => {
    ev.target.src = "./img/mediaNotReady.png";
  };

  if (ext === null) {
    const reExtension = /(?:\.([^.]+))?$/;
    ext = file.match(reExtension)[1].toLowerCase();
  }

  switch (ext) {
    case "docx":
      // console.log("Viewer: Word Doc found");

      const pdf = fileExistsOnS3(file + Date.now() + ".pdf");

      if (pdf !== undefined && !pdf instanceof Blob) {
        return (
          <PDFViewer key={file + Date.now() + ".pdf"} file={file + ".pdf"} />
        );
      } else {
        return <WordViewer key={file + Date.now()} file={file} index={index} />;
      }
    case "pdf":
      // console.log("Viewer: PDF found");
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
  }
};
