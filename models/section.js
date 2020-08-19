const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const sectionSchema = new mongoose.Schema({
  url: String,
  words: Array
});

sectionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

sectionSchema.plugin(uniqueValidator);

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
