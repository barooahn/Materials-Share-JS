import React from "react";
import VideoFile from "./VideoFile";
import DocViewer from "./DocViewer";

const Viewer = ({ file, ext = null, thumb = null }) => {
  // console.log(" Viewer- ext", ext);
  file = thumb !== null ? thumb : file;
  const getPlayer = (file) => {
    if (ext === null) {
      const reExtension = /(?:\.([^.]+))?$/;

      ext = file.match(reExtension)[1].toLowerCase();
    }
    if (ext === "docx" || ext === "pdf")
      return { type: "doc", name: file, ext: ext };
    else if (
      ext === "jpg" ||
      ext === "jpeg" ||
      ext === "svg" ||
      ext === "png"
    ) {
      // console.log(" Viewer- got a img", file);
      return { type: "image", name: file };
    } else {
      return { type: "media", file: file };
    }
  };

  const renderPlayer = (filesInput) => {
    const file = getPlayer(filesInput);
    const mediaStyle = {
      width: "100%",
      height: "auto",
    };

    if (file.type === "media") {
      return <VideoFile key={file.file} file={file.file} />;
    } else if (file.type === "image") {
      return (
        <img
          style={mediaStyle}
          key={file.name}
          alt={file.name}
          src={file.name}
        />
      );
    } else if (file.type === "doc") {
      // console.log(" Viewer- got a doc", file);

      const randId =
        "wordDoc" +
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 12);

      return (
        <DocViewer
          key={file.name + Date.now()}
          file={file.name}
          ext={file.ext}
          randId={randId}
        />
      );
    } else return null;
  };
  return renderPlayer(file);
};

export default Viewer;
