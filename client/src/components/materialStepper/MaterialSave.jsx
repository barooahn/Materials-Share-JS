////////////////////////////////////////think unused can delete///////////////////////////////

import React, { Component, useState } from "react";
import axios from "axios";

// Take all the data from the form and process it
export default props => {
  this.state = {
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

  handleSelectChange = async (input, value) => {
    // console.log("select changed ", input, value);
    await this.setState({ [input]: value });
    // console.log("state changed ", this.state[input]);
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

  jsUcfirst = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
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
};
