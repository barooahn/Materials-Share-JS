import React from "react";
import VideoFile from "../VideoFile";
import DocViewer from "../DocViewer";

//const path = process.env.UPLOAD_PATH;
const path = "https://s3.eu-west-2.amazonaws.com/matshre-assets/";

const getPlayer = props => {
  const { file } = props;
  const reExtension = /(?:\.([^.]+))?$/;
  const ext = file.match(reExtension)[1];
  if (ext === "docx" || ext === "pdf")
    return { type: "doc", name: path + file, ext: ext };
  else if (ext === "jpg" || ext === "jpeg" || ext === "svg" || ext === "png") {
    return { type: "image", name: path + file };
  } else {
    return { type: "media", name: path + file };
  }
};

const renderPlayer = filesInput => {
  const file = getPlayer(filesInput);
  const mediaStyle = {
    width: "100%",
    height: "auto"
  };

  if (file.type === "media") {
    return <VideoFile key={file.name} file={file.name} />;
  } else if (file.type === "image") {
    return (
      <img style={mediaStyle} key={file.name} alt={file.name} src={file.name} />
    );
  } else {
    return <DocViewer key={file.name} file={file.name} ext={file.ext} />;
  }
};

const Viewer = props => {
  return renderPlayer(props);
};

export default Viewer;
