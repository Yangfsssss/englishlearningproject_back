const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const dailyLearningStuffSchema = mongoose.Schema({
  memo: {
    type: String
    // required: true
  },
  url: {
    type: String
  }
});

dailyLearningStuffSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

dailyLearningStuffSchema.plugin(uniqueValidator);

const DailyLearningStuff = mongoose.model(
  "DailyLearningStuff",
  dailyLearningStuffSchema
);

module.exports = DailyLearningStuff;
