// server/models/Material.js
const mongoose = require("mongoose");
let MaterialSchema = new mongoose.Schema({
  title: String,
  timeInClass: Number,
  procedureBefore: String,
  procedureIn: String,
  book: { title: String, page: Number },
  followUp: String,
  variations: String,
  tips: String,
  notes: String,
  files: [String],
  category: String,
  objective: String,
  level: [
    {
      label: String,
      value: String
    }
  ],
  languageFocus: [
    {
      label: String,
      value: String
    }
  ],
  activityUse: [
    {
      label: String,
      value: String
    }
  ],
  pupilTask: [
    {
      label: String,
      value: String
    }
  ],
  targetLanguage: [
    {
      label: String,
      value: String
    }
  ],
  materials: String,
  preparation: Number,
  clap: Number,
  shared: String,
  dateCreated: Date,
  dateModified: Date,
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [
    {
      author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      text: String
    }
  ]
});
MaterialSchema.methods.addClap = function() {
  this.claps++;
  return this.save();
};
MaterialSchema.methods.comment = function(c) {
  this.comments.push(c);
  return this.save();
};
MaterialSchema.methods.addAuthor = function(author_id) {
  this.author = author_id;
  return this.save();
};
MaterialSchema.methods.getUserMaterial = function(_id) {
  Material.find({ author: _id }).then(material => {
    return material;
  });
};

module.exports = mongoose.model("Material", MaterialSchema);
