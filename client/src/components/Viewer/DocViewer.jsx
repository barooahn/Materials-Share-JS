import React, { Component } from "react";
import FileViewer from "react-file-viewer";

class DocViewer extends Component {
  render() {
    const file = this.props.file;
    const type = this.props.ext;
    console.log("doc-viewer");
    return (
      <FileViewer
        key={file}
        fileType={type}
        filePath={file}
        onError={this.onError}
      />
    );
  }

  onError(e) {
    console.log(e, "error in file-viewer");
  }
}

export default DocViewer;
