const mongoose = require("mongoose");

const QAUnitSchema = new mongoose.Schema({
  date: String,
  type: String,
  question: String,
  answer: String
});

QAUnitSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const QAUnit = mongoose.model("QAUnit", QAUnitSchema);

module.exports = QAUnit;
