// server/models/Material.js
const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

let MaterialSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, slug: "title" },
  timeInClass: Number,
  timePrep: Number,
  procedureBefore: String,
  procedureIn: String,
  book: String,
  page: Number,
  followUp: String,
  variations: String,
  tips: String,
  notes: String,
  files: [String],
  category: [
    {
      label: String,
      value: String,
    },
  ],
  objective: String,
  level: [
    {
      label: String,
      value: String,
    },
  ],
  likes: [String],
  languageFocus: [
    {
      label: String,
      value: String,
    },
  ],
  activityUse: [
    {
      label: String,
      value: String,
    },
  ],
  pupilTask: [
    {
      label: String,
      value: String,
    },
  ],
  targetLanguage: String,
  institute: [
    {
      label: String,
      value: String,
    },
  ],
  materials: String,
  shared: Boolean,
  dateCreated: Date,
  dateModified: Date,
  author_id: {
    type: String,
  },
  author_img: {
    type: String,
  },

  comments: [
    {
      author_id: {
        type: String,
      },
      text: String,
    },
  ],
});
MaterialSchema.methods.addClap = function () {
  this.claps++;
  return this.save();
};
MaterialSchema.methods.comment = function (c) {
  this.comments.push(c);
  return this.save();
};
MaterialSchema.methods.addAuthor = function (author_id) {
  this.author = author_id;
  return this.save();
};
MaterialSchema.methods.getUserMaterial = function (_id) {
  Material.find({ author: _id }).then((material) => {
    return material;
  });
};

module.exports = mongoose.model("Material", MaterialSchema);
