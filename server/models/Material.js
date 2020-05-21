// server/models/Material.js
const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

let MaterialSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  slug: { type: String, slug: "title" },
  timeInClass: Number,
  timePrep: Number,
  procedureBefore: { type: String, trim: true },
  procedureIn: { type: String, trim: true },
  book: { type: String, trim: true },
  page: Number,
  followUp: { type: String, trim: true },
  variations: { type: String, trim: true },
  tips: { type: String, trim: true },
  notes: { type: String, trim: true },
  files: [{ type: String, trim: true }],
  thumb: { type: String, trim: true },
  category: [
    {
      label: { type: String, trim: true },
      value: { type: String, trim: true },
    },
  ],
  objective: { type: String, trim: true },
  level: [
    {
      label: { type: String, trim: true },
      value: { type: String, trim: true },
    },
  ],
  likes: [{ type: String, trim: true }],
  languageFocus: [
    {
      label: { type: String, trim: true },
      value: { type: String, trim: true },
    },
  ],
  activityUse: [
    {
      label: { type: String, trim: true },
      value: { type: String, trim: true },
    },
  ],
  pupilTask: [
    {
      label: { type: String, trim: true },
      value: { type: String, trim: true },
    },
  ],
  targetLanguage: { type: String, trim: true },
  institute: [
    {
      label: { type: String, trim: true },
      value: { type: String, trim: true },
    },
  ],
  materials: { type: String, trim: true },
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
        type: { type: String, trim: true },
      },
      text: { type: String, trim: true },
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
// MaterialSchema.methods.addAuthor = function (author_id) {
//   this.author = author_id;
//   return this.save();
// };
MaterialSchema.methods.getUserMaterial = function (_id) {
  Material.find({ author: _id }).then((material) => {
    return material;
  });
};

module.exports = mongoose.model("Material", MaterialSchema);
