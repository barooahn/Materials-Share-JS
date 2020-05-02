/** server/controllers/material.ctrl.js*/
const Material = require("../models/Material");
const fs = require("fs");
const { uploadAws, deleteAws } = require("../file-upload/aws-file-services");

// const filepath = `${__dirname}../../../client/public/files/`;
// const filepath = "localhost:5000/server/tempFileUpload/";
const filepath = `${__dirname}..\\..\\..\\public\\`;
// const filepath = "";

const moveFile = (file) => {
  file.name = file.name.replace(/\s/g, "_").toLowerCase();
  return new Promise(function (resolve, reject) {
    const oldPath = file.path;
    // console.log("path " + filepath);
    const newPath = filepath + file.name;
    fs.rename(oldPath, newPath, function (err) {
      if (err) reject(new Error("Could not upload file " + err));
      return resolve(file.name);
    });
  });
};

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

getFileFromPath = (filePath) => {
  return fs.readFileSync(
    `${__dirname}..\\..\\..\\public\\${filePath}`,
    function (err, data) {
      if (!err) {
        // console.log("received data: " + data);
        return data;
      } else {
        console.log(err);
      }
    }
  );
};

module.exports = {
  getFiles: (req, res) => {
    // console.log("get files data", req.body);
    req.body.map((file) => {
      fs.readFile(file, (err, data) => {
        if (!err) {
          //	console.log("received data: " + data);
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        } else {
          console.log(err);
        }
      });
    });
  },

  fileUpload: async (req, res) => {
    if (req.query.saveType === "localUpload") {
      console.log("uploading local file ...");
      Promise.all(req.files.files.map((file) => moveFile(file))).then(
        (result) => {
          // console.log("local file storage back end", result);
          return res.json(result);
          //save to DB
        }
      );
    } else {
      console.log("uploading aws file ...");
      if (req.files.files) {
        Promise.all(
          req.files.files.map((file) => {
            return uploadAws(file);
          })
        ).then((result) => {
          // console.log("AWS storage back end", result);
          //save to DB
          return res.json(result);
        });
      }
    }

    //node-schedule remove old files (after certain date)
  },

  deleteFile: async (req, res, next) => {
    console.log("deleting...", req.body.file);
    const result = await deleteAws(req.body.file);
    if (result) {
      return res.json({ deleted: req.body.file });
    } else {
      console.log("err file not deleted");
      return res.err;
    }
  },

  addMaterial: (req, res, next) => {
    console.log("saving material backend... ", res.body);

    new Material(req.body).save((err, material) => {
      if (err) res.send(err);
      else if (!material) res.send(400);
      else {
        return material.addAuthor(material.author_id).then((_material) => {
          return res.send(_material);
        });
      }
      next();
    });
  },

  getUserMaterials: async (req, res, next) => {
    await Material.find({ author_id: req.params.author_id })
      .sort({ dateModified: -1 })
      .exec((err, materials) => {
        if (materials) return res.send(materials);
        else if (err) return res.send(err);
        else return res.send(404);
      });
  },

  getMaterials: async (req, res, next) => {
    await Material.find()
      .sort({ dateModified: -1 })
      .exec((err, materials) => {
        if (materials) return res.send(materials);
        else if (err) return res.send(err);
        else return res.send(404);
      });
  },

  getMaterial: (req, res, next) => {
    Material.findById(req.params.id)
      .populate("author")
      .exec((err, material) => {
        if (err) res.send(err);
        else if (!material) res.send(404);
        else res.send(material);
        next();
      });
  },

  updateMaterial: (req, res, next) => {
    console.log("in update material body = ", req.body);
    Material.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { upsert: true },
      function (err, material) {
        if (err) return next(err);
        // res.send("material udpated.");
        // console.log("material updated ", material);
        return res.send(material);
      }
    );
  },

  deleteMaterial: (req, res, next) => {
    Material.findOneAndDelete({ _id: req.params.id }, function (err) {
      if (err) {
        console.log("there was an error deleteing the material", err);
        return res.err;
      }
      console.log("material deleted ");
      return res;
    });
  },

  getDistinct: (req, res, next) => {
    Material.distinct(req.params.field, function (err, values) {
      // ids is an array of all ObjectIds
      if (err) throw err;

      let distinct = [];

      values.forEach((x) => {
        //console.log("x.label ===", x.label);
        distinct.includes(x.label) ? null : distinct.push(x.label);
      });
      //console.log("Distinct values: ", distinct);
      res.json({ values: distinct });
    });
  },

  getSearchResults: (req, res, next) => {
    const regex = new RegExp(escapeRegex(req.params.q), "gi");
    Material.find({ $text: { $search: regex } }, function (err, materials) {
      if (err) console.log("there was a search error", err);
      res.send(materials);
    });
  },

  getFilterResults: async (req, res, next) => {
    // console.log("material.ctrl.js-filter query: ", req.query);
    let {
      search,
      timeInClass,
      timePrep,
      level,
      languageFocus,
      activityUse,
      category,
    } = req.query;
    queryCond = {
      ...(search && { search: new RegExp(escapeRegex(search), "gi") }),
      ...(level && { "level.value": level }),
      ...(activityUse && { "activityUse.value": activityUse }),
      ...(category && { "category.value": category }),
      ...(languageFocus && { "languageFocus.value": languageFocus }),
      ...(timeInClass && {
        timeInClass: {
          $gte: timeInClass.split(",")[0],
          $lte: timeInClass.split(",")[1],
        },
      }),
      ...(timePrep && {
        timePrep: {
          $gte: timePrep.split(",")[0],
          $lte: timePrep.split(",")[1],
        },
      }),
    };

    // let regex = {};
    // if (search !== "") {
    //   regex = new RegExp(escapeRegex(search), "gi");
    // }
    console.log("material.ctrl.js-filter queryCond: ", queryCond);

    const searchResults = await Material.find(queryCond);
    if (searchResults) {
      return res.json(searchResults);
    } else {
      console.log("err cannot filter", err);
      return res.err;
    }
    // console.log("material.ctrl.js-filter searchResults: ", searchResults);
    // res.send(searchResults);
  },

  getTitles: async (req, res, next) => {
    await Material.find()
      .select({ title: 1, _id: 0 })
      .sort({ dateModified: -1 })
      .exec((err, titles) => {
        if (titles) return res.send(titles);
        else if (err) return res.send(err);
        else return res.send(404);
      });
  },

  getUserLikes: async (req, res, next) => {
    console.log("material.ctrl.js - getUserLikes - id:", req.params.author_id);
    await Material.find({ likes: req.params.author_id })
      .sort({ dateModified: -1 })
      .exec((err, materials) => {
        if (materials) return res.send(materials);
        else if (err) return res.send(err);
        else return res.send(404);
      });
  },
};
