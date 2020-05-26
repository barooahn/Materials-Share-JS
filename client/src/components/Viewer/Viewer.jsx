import React from "react";
import VideoFile from "./VideoFile";
import DocViewer from "./DocViewer";

const Viewer = ({ file, ext = null, thumb = null }) => {
  // console.log(" Viewer- ext", ext);
  file = thumb !== null ? thumb : file;
  // const getPlayer = (file) => {
  if (ext === null) {
    const reExtension = /(?:\.([^.]+))?$/;

    ext = file.match(reExtension)[1].toLowerCase();
    // console.log("Viewer - file", file);
  }
  if (ext === "docx" || ext === "pdf") {
    const randId =
      "wordDoc" +
      Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 12);
    return (
      <DocViewer
        key={file + Date.now()}
        file={file}
        ext={ext}
        randId={randId}
      />
    );
  } else if (
    ext === "jpg" ||
    ext === "jpeg" ||
    ext === "svg" ||
    ext === "png"
  ) {
    // console.log(" Viewer- got a img", file);
    const mediaStyle = {
      width: "100%",
      height: "auto",
    };
    return <img style={mediaStyle} key={file} alt={file} src={file} />;
  } else {
    return <VideoFile key={file} file={file} />;
  }
};

export default Viewer;
