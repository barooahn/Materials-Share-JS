/** server/controllers/material.ctrl.js*/
const Material = require("../models/Material");
const fs = require("fs");
const { uploadAws, deleteAws } = require("../file-upload/aws-file-services");
const sharp = require("sharp");

const filepath = `${__dirname}..\\..\\..\\public\\`;

// const moveFile = (file) => {
//   file.name = file.name.replace(/\s/g, "_").toLowerCase();
//   return new Promise(function (resolve, reject) {
//     const oldPath = file.path;
//     // console.log("path " + filepath);
//     const newPath = filepath + file.name;
//     fs.rename(oldPath, newPath, function (err) {
//       if (err) reject(new Error("Could not upload file " + err));
//       return resolve(file.name);
//     });
//   });
// };

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
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
    console.log("uploading aws file ...", req.files.files);
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

    //node-schedule remove old files (after certain date)
  },

  thumbUpload: async (req, res) => {
    uploadAws(req.body.file).then((result) => {
      // console.log("material.ctrl - thumbUpload - results", result);
      return res.json(result);
    });
  },

  // getFileFromPath: async (req, res) => {
  //   console.log("material.ctrl - getFileFromPath - path", req.body.path);
  //   const path = req.body.path;
  //   fs.readFile(path, "utf8", (err, data) => {
  //     // console.log("material.ctrl - getFileFromPath - received data: " + data);
  //     if (err) res.send(err);
  //     else if (!data) res.send(400);
  //     else {
  //       return res.json(data);
  //     }
  //   });
  // },

  makeThumb: async (req, res, next) => {
    // console.log("making thumb from files...", req);
    const file = req.files.file;
    // console.log("material.ctrl -making thumb from files...", req.files.file);
    sharp(file.path)
      .resize(300, 200)
      .toFile(`/tmp/thumb_${file.name}`)
      .then((info) => {
        const thumb = {
          name: `thumb_${req.files.file.name}`,
          path: `/tmp/thumb_${req.files.file.name}`,
        };
        return res.json(thumb);
      })
      .catch((err) => {
        console.log("Material ctrl make thumb - err thumb not made ", err);
      });
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
    // console.log("Material.ctrl - save - saving material backend... ", req.body);

    new Material(req.body).save((err, material) => {
      if (err) res.send(err);
      else if (!material) res.send(400);
      else {
        // return material.addAuthor(material.author_id).then((_material) => {
        // return res.send(_material);
        console.log("Material.ctrl - save - saved ... ", material);
        return res.send(material);
        // });
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

  materialsPaginated: async (req, res, next) => {
    var page = parseInt(req.query.page) || 0; //for next page pass 1 here
    var limit = parseInt(req.query.limit) || 3;
    var query = {};
    await Material.find(query)
      .sort({ dateModified: -1 })
      .skip(page * limit) //Notice here
      .limit(limit)
      .exec((err, doc) => {
        if (err) {
          return res.json(err);
        }
        Material.countDocuments(query).exec((count_error, count) => {
          if (err) {
            return res.json(count_error);
          }
          // console.log("materials.ctrl - materialsPaginaged doc", doc);
          return res.json({
            total: count,
            page: page,
            pageSize: doc.length,
            materials: doc,
          });
        });
      });
  },

  getMaterialId: (req, res, next) => {
    // console.log("Materials.ctrl getMaterialId id", req.params.id);
    Material.findById(req.params.id).exec((err, material) => {
      // console.log("Materials.ctrl getMaterialId material", material);
      if (material) return res.send(material);
      else if (err) return res.send(err);
      else return res.send(404);
    });
  },

  getMaterialSlug: (req, res, next) => {
    Material.find({ slug: req.params.slug })
      // .populate("author")
      .exec((err, material) => {
        if (material) return res.send(material);
        else if (err) return res.send(err);
        else return res.send(404);
      });
  },

  updateMaterial: (req, res, next) => {
    // console.log("in update material body = ", req.body);
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
    // console.log("material.ctrl.js-filter queryCond: ", queryCond);

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
    // console.log("material.ctrl.js - getUserLikes - id:", req.params.author_id);
    await Material.find({ likes: req.params.author_id })
      .sort({ dateModified: -1 })
      .exec((err, materials) => {
        if (materials) return res.send(materials);
        else if (err) return res.send(err);
        else return res.send(404);
      });
  },
};
