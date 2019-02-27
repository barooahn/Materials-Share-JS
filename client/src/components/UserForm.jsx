import React, { Component } from "react";
import FormFileDetails from "./FormFileDetails";
import FormQuickFiles from "./FormQuickFiles";
import FormQuickMaterial from "./FormQuickMaterial";
import Confirm from "./Confirm";
import Success from "./Success";
import axios from "axios";
import FormFullMaterial from "./FormFullMaterial";

const allowedMimeTypes = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "audio/mpeg",
  "audio/x-wav",
  "audio/mp3",
  "image/jpeg",
  "image/png",
  "video/mpeg",
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo"
];

export class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      selectedFiles: [],
      filePaths: [],
      showContinue: false,
      showUpload: false,
      title: "",
      timeInClass: 0,
      procedureBefore: "",
      procedureIn: "",
      book: { title: "", page: 0 },
      followUp: "",
      variations: "",
      tips: "",
      notes: "",
      category: [],
      objective: "",
      level: [],
      languageFocus: [],
      activityUse: [],
      pupilTask: [],
      shared: "true",
      materials: "",
      preparation: 0,
      clap: 0,
      dateCreated: null,
      dateModified: null,
      author: { _id: null },
      comments: [{ author: { _id: null, text: "" } }]
    };
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  jsUcfirst = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  // Handle fields change
  handleChange = input => e => {
    // console.log("handle", input, e.target.value);
    this.setState({ [input]: e.target.value });
  };

  // Handle special case book change
  handleBookChange = input => e => {
    let book = { ...this.state.book };
    book[input] = this.jsUcfirst(e.target.value); //updating value
    this.setState({ book });
  };

  handleSelectChange = async (input, value) => {
    // console.log("select changed ", input, value);
    await this.setState({ [input]: value });
    // console.log("state changed ", this.state[input]);
  };

  handleselectedFile = e => {
    let files = Array.from(e.target.files);
    // console.log("uploaded files are ", e.target.files);
    //validate mime type
    const reExtension = /(?:\.([^.]+))?$/;
    files.map(x => {
      const ext = x.name.match(reExtension)[1];
      if (ext === "docx") {
        return x;
      } else {
        return files.filter(x => allowedMimeTypes.includes(x.type));
      }
    });

    // check for spaces and invalid chars
    this.setState({
      selectedFiles: files,
      loaded: 0,
      showUpload: true
    });
  };

  handleDelete = file => {
    axios
      .delete("/api/material/file/delete", {
        data: { file: file }
      })
      .then(res => {
        const removed = [...this.state.filePaths].filter(
          x => x !== res.data.deleted
        );
        this.setState({
          filePaths: removed
        });
        console.log("filePaths after deleted", this.state.filePaths);
        if (this.state.filePaths.length < 1)
          this.setState({
            showContinue: false
          });
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  handleUpload = () => {
    const data = new FormData();
    for (var i = 0; i < this.state.selectedFiles.length; i++) {
      let file = this.state.selectedFiles[i];
      data.append("files[" + i + "]", file);
    }
    axios
      .post("/api/material/file/upload", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        //console.log("it's an array", res.data);
        const paths = res.data.map(data => data.path);
        this.setState({
          filePaths: [...this.state.filePaths, ...paths],
          showContinue: true
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  saveFull = () => {
    console.log("saving to db...");
    const {
      title,
      filePaths,
      timeInClass,
      procedureBefore,
      procedureIn,
      book,
      page,
      followUp,
      variations,
      tips,
      notes,
      category,
      shared,
      objective,
      level,
      languageFocus,
      activityUse,
      pupilTask,
      materials,
      preparation
    } = this.state;
    if (
      filePaths !== {} &&
      title !== "" &&
      objective !== "" &&
      level !== [] &&
      preparation !== 0 &&
      timeInClass !== 0 &&
      pupilTask !== []
    ) {
      console.log("validated for db");

      const material = {
        procedureBefore,
        procedureIn,
        book: this.jsUcfirst(book).trim(),
        page,
        followUp,
        variations,
        shared,
        tips,
        notes,
        category,
        languageFocus,
        activityUse,
        materials,
        files: filePaths,
        title: this.jsUcfirst(title).trim(),
        objective: this.jsUcfirst(objective).trim(),
        level,
        preparation,
        timeInClass,
        pupilTask,
        dateCreated: new Date(),
        dateModified: new Date()
      };
      this.sendToDb(material);
    }
  };

  saveQuick = () => {
    console.log("saving to db...");
    const {
      filePaths,
      title,
      objective,
      level,
      preparation,
      shared,
      timeInClass,
      pupilTask
    } = this.state;
    if (
      filePaths !== {} &&
      title !== "" &&
      objective !== "" &&
      level !== [] &&
      preparation !== 0 &&
      timeInClass !== 0 &&
      pupilTask !== []
    ) {
      console.log("validated for db");

      const material = {
        files: filePaths,
        title: this.jsUcfirst(title).trim(),
        objective: this.jsUcfirst(objective).trim(),
        level: level,
        preparation,
        timeInClass,
        shared,
        pupilTask: pupilTask,
        dateCreated: new Date(),
        dateModified: new Date()
      };
      this.sendToDb(material);
    }
  };

  saveMin = () => {
    console.log("saving to db...");
    const { filePaths, title } = this.state;
    if (filePaths !== {} && title !== "") {
      console.log("validated for db");

      const material = {
        files: filePaths,
        title: this.jsUcfirst(title).trim(),
        dateCreated: new Date(),
        dateModified: new Date()
      };
      this.sendToDb(material);
    }
  };

  sendToDb = material => {
    material.author_id = localStorage.getItem("USER_ID");
    console.log("sending material to db...", material);
    axios
      .post("/api/material/", material, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        console.log("saved to db", res.data);
        this.setState({
          step: 6
        });
      })
      .catch(function(err) {
        throw err;
      });
  };

  promiseOptions = field =>
    new Promise(resolve => {
      // console.log("getting options...");
      resolve(
        axios
          .get("/api/material/field/" + field)
          .then(res => {
            //.log("options ", res.data);
            return res.data.values.map(label => ({
              label: label,
              value: label.toLowerCase().replace(/\W/g, "")
            }));
          })
          .catch(function(err) {
            throw err;
          })
      );
    });

  render() {
    const { step } = this.state;

    const {
      filePaths,
      showContinue,
      selectedFiles,
      showUpload,
      loaded,
      title,
      timeInClass,
      procedureBefore,
      procedureIn,
      book,
      followUp,
      variations,
      tips,
      notes,
      files,
      category,
      objective,
      level,
      shared,
      languageFocus,
      activityUse,
      pupilTask,
      materials,
      preparation,
      clap,
      dateCreated,
      dateModified,
      author,
      comments
    } = this.state;

    const values = {
      filePaths,
      showContinue,
      selectedFiles,
      showUpload,
      loaded,
      title,
      timeInClass,
      procedureBefore,
      procedureIn,
      book,
      followUp,
      variations,
      tips,
      notes,
      files,
      category,
      objective,
      level,
      shared,
      languageFocus,
      pupilTask,
      activityUse,
      materials,
      preparation,
      clap,
      dateCreated,
      dateModified,
      author,
      comments
    };

    switch (step) {
      case 1:
        return (
          <FormFileDetails
            nextStep={this.nextStep}
            handleUpload={this.handleUpload}
            handleDelete={this.handleDelete}
            handleselectedFile={this.handleselectedFile}
            values={values}
          />
        );
      case 2:
        return (
          <FormQuickFiles
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            saveMin={this.saveMin}
            values={values}
          />
        );
      case 3:
        return (
          <FormQuickMaterial
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            saveQuick={this.saveQuick}
            values={values}
            getSelectOptions={this.getSelectOptions}
            handleSelectChange={this.handleSelectChange}
            promiseOptions={this.promiseOptions}
          />
        );
      case 4:
        return (
          <FormFullMaterial
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            saveFull={this.saveFull}
            values={values}
            getSelectOptions={this.getSelectOptions}
            handleSelectChange={this.handleSelectChange}
            handleBookChange={this.handleBookChange}
            promiseOptions={this.promiseOptions}
          />
        );
      case 5:
        return (
          <Confirm
            prevStep={this.prevStep}
            values={values}
            renderPlayer={this.renderPlayer}
            saveFull={this.saveFull}
          />
        );
      case 6:
        return <Success />;

      default:
        return <FormFileDetails />;
    }
  }
}

export default UserForm;
