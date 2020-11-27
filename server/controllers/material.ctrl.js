/** server/controllers/material.ctrl.js*/
const Material = require("../models/Material");
const fs = require("fs");
const {
  uploadAws,
  deleteAws,
  getSignedUrlAws,
} = require("../file-upload/aws-file-services");
const sharp = require("sharp");

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = {
  getFiles: (req, res) => {
    req.body.map((file) => {
      fs.readFile(file, (err, data) => {
        if (!err) {
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
        //save to DB
        return res.json(result);
      });
    }
  },

  thumbUpload: async (req, res) => {
    uploadAws(req.body.file).then((result) => {
      return res.json(result);
    });
  },

  makeThumb: async (req, res, next) => {
    const file = req.files.file;
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

  getSignedUrlIfExists: async (req, res, next) => {
    const signedUrl = await getSignedUrlAws(req.query.url);
    return res.json(signedUrl);
  },

  addMaterial: (req, res, next) => {
    new Material(req.body).save((err, material) => {
      console.log("Checking material...", req.body);
      if (err) res.send(err);
      else if (!material) res.send(400);
      else {
        return res.send(material);
        // });
      }
      next();
    });
  },

  getMaterials: async (req, res, next) => {
    var query = { shared: true };
    await Material.find(query)
      .sort({ dateModified: -1 })
      .exec((err, materials) => {
        if (materials) return res.send(materials);
        else if (err) return res.send(err);
        else return res.send(404);
      });
  },

  getUserMaterials: async (req, res, next) => {
    var page = parseInt(req.query.page) || 0; //for next page pass 1 here
    var limit = parseInt(req.query.limit) || 3;
    var query = { author_id: req.query.id };
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

  getUserLikes: async (req, res, next) => {
    // console.log("material.ctrl.js - getUserLikes - id:", req.params.author_id);
    var page = parseInt(req.query.page) || 0; //for next page pass 1 here
    var limit = parseInt(req.query.limit) || 3;
    var query = { likes: req.query.id };
    // console.log("materials.ctrl - getUserLikes req.query.id ", req.query.id);
    await Material.find(query)
      .sort({ dateModified: -1 })
      .skip(page * limit) //Notice here
      .limit(limit)
      .exec((err, doc) => {
        if (err) {
          return res.json(err);
        }
        // console.log("materials.ctrl - getUserLikes ", doc);
        Material.countDocuments(query).exec((count_error, count) => {
          if (err) {
            return res.json(count_error);
          }
          return res.json({
            total: count,
            page: page,
            pageSize: doc.length,
            materials: doc,
          });
        });
      });
  },

  materialsPaginated: async (req, res, next) => {
    var page = parseInt(req.query.page) || 0; //for next page pass 1 here
    var limit = parseInt(req.query.limit) || 3;
    var query = { shared: true };
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

  materialsPaginatedIB: async (req, res, next) => {
    var page = parseInt(req.query.page) || 0; //for next page pass 1 here
    var limit = parseInt(req.query.limit) || 3;
    var query = {
      shared: true,
      "curriculum.value": "internationalbaccalaureateib",
    };
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
          console.log("materials.ctrl - materialsPaginaged doc", doc);
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
    Material.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { upsert: true },
      function (err, material) {
        if (err) return next(err);

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
        distinct.includes(x.label) ? null : distinct.push(x.label);
      });

      res.json({ values: distinct });
    });
  },

  getSearchResults: (req, res, next) => {
    const regex = new RegExp(escapeRegex(req.body.search), "gi");
    console.log("material.ctrl.js-getSearchResults regex", regex);
    Material.find({ $text: { $search: regex }, shared: true }, function (
      err,
      materials
    ) {
      if (materials) return res.send(materials);
      if (err) console.log("there was a search error", err);
      res.json({ message: "No results" });
    });
  },

  getFilterResults: (req, res, next) => {
    let {
      search,
      timeInClass,
      timePrep,
      level,
      languageFocus,
      activityUse,
      pupilTask,
      category,
      curriculum,
    } = req.body;
    console.log("material.ctrl - getFilterResults", search);
    queryCond = {
      ...(search && {
        $text: {
          $search: new RegExp(escapeRegex(search), "gi"),
        },
        //   search: new RegExp(escapeRegex(search), "gi"),
      }),
      ...(level.length > 0 && { "level.value": `${level}` }),
      ...(curriculum.length > 0 && { "curriculum.value": `${curriculum}` }),
      ...(activityUse.length > 0 && { "activityUse.value": `${activityUse}` }),
      ...(category.length > 0 && { "category.value": `${category}` }),
      ...(pupilTask.length > 0 && { "pupilTask.value": `${pupilTask}` }),
      ...(languageFocus.length > 0 && {
        "languageFocus.value": `${languageFocus}`,
      }),
      ...(timeInClass && {
        timeInClass: {
          $gte: timeInClass[0],
          $lte: timeInClass[1],
        },
      }),
      ...(timePrep && {
        timePrep: {
          $gte: timePrep[0],
          $lte: timePrep[1],
        },
      }),
    };

    console.log("material.ctrl.js-filter queryCond: ", queryCond);
    Material.find(queryCond, function (err, materials) {
      // const searchResults = await Material.find(queryCond);
      if (materials) {
        console.log(
          "material.ctrl.js-filter searchResults: ",
          materials.length
        );
      }
      if (materials) return res.send(materials);
      if (err) console.log("there was a search error", err);
    });
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
};
