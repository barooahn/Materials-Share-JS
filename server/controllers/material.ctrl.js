/** server/controllers/material.ctrl.js*/
const Material = require("../models/Material");
const fs = require("fs");
const { uploadAws, deleteAws } = require("../file-upload/aws-file-services");

const filepath = `${__dirname}../../../client/public/files/`;

module.exports = {
  getFiles: (req, res) => {
    console.log("get files data", req.body);
    req.body.map(file => {
      fs.readFile(filepath + file, (err, data) => {
        if (err) throw err;
        console.log(data);
      });
    });
  },

  uploadFile: async (req, res) => {
    console.log("uploading file ...");

    Promise.all(req.files.files.map(file => uploadAws(file))).then(result => {
      // console.log("result if array back end", result);
      res.json(result);
      //save to DB
    });

    // ****local storeage moved to AWS ****
    // function moveFile(file) {
    //   file.name = file.name.replace(/\s/g, "_").toLowerCase();
    //   return new Promise(function(resolve, reject) {
    //     const oldPath = file.path;
    //     const newPath = filepath + file.name;
    //     fs.rename(oldPath, newPath, function(err) {
    //       if (err) reject(new Error("Could not upload file " + err));
    //       console.log;
    //       resolve({ file: file.name });
    //     });
    //   });
    // }
  },

  deleteFile: async (req, res, next) => {
    console.log("deleting...");

    const result = await deleteAws(req.body.file);
    if (result) {
      res.json({ deleted: req.body.file });
    } else {
      console.log("err file not deleted");
      res.err;
    }
  },

  addMaterial: (req, res, next) => {
    console.log("saving material backend... ");

    filterProperties = obj => {
      for (var key in obj) {
        if (obj[key] !== null && obj[key] != "" && obj[key] != []) {
        } else {
          delete obj[key];
        }
        return obj;
      }
    };

    //console.log("req.body ", req.body);
    const filteredMaterial = filterProperties(req.body);
    console.log("filteredMaterial ", filteredMaterial);

    new Material(filteredMaterial).save((err, material) => {
      if (err) res.send(err);
      else if (!material) res.send(400);
      else {
        return material.addAuthor(material.author_id).then(_material => {
          return res.send(_material);
        });
      }
      next();
    });
  },

  getUserMaterials: async (req, res, next) => {
    await Material.find({ author_id: req.params.author_id }).exec(
      (err, materials) => {
        if (materials) return res.send(materials);
        else if (err) return res.send(err);
        else return res.send(404);
      }
    );
  },

  getMaterials: async (req, res, next) => {
    await Material.find().exec((err, materials) => {
      if (materials) return res.send(materials);
      else if (err) return res.send(err);
      else return res.send(404);
    });
  },
  /**
   * material_id
   */
  clapMaterial: (req, res, next) => {
    Material.findById(req.body.material_id)
      .then(material => {
        return material.clap().then(() => {
          return res.json({ msg: "Done" });
        });
      })
      .catch(next);
  },
  /**
   * comment, author_id, material_id
   */
  commentMaterial: (req, res, next) => {
    Material.findById(req.body.material_id)
      .then(material => {
        return material
          .comment({
            author: req.body.author_id,
            text: req.body.comment
          })
          .then(() => {
            return res.json({ msg: "Done" });
          });
      })
      .catch(next);
  },
  /**
   * material_id
   */
  getMaterial: (req, res, next) => {
    Material.findById(req.params.id)
      .populate("author")
      .populate("comments.author")
      .exec((err, material) => {
        if (err) res.send(err);
        else if (!material) res.send(404);
        else res.send(material);
        next();
      });
  },

  updateMaterial: (req, res, next) => {
    next();
  },

  deleteMaterial: (req, res, next) => {
    next();
  },

  getDistinct: (req, res, next) => {
    Material.distinct(req.params.field, function(err, values) {
      // ids is an array of all ObjectIds
      if (err) throw err;

      let distinct = [];

      values.forEach(x => {
        //console.log("x.label ===", x.label);
        distinct.includes(x.label) ? null : distinct.push(x.label);
      });
      //console.log("Distinct values: ", distinct);
      res.json({ values: distinct });
    });
  }
};
