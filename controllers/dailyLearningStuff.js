const dailyLearningStuffRouter = require("express").Router();
const DailyLearningStuff = require("../models/dailyLearningStuff");

dailyLearningStuffRouter.get("/", async (req, res) => {
  const dailyLearningStuffs = await DailyLearningStuff.find({});
  res.json(
    dailyLearningStuffs.map((dailyLearningStuff) => dailyLearningStuff.toJSON())
  );
});

dailyLearningStuffRouter.post("/", async (req, res) => {
  const body = req.body;

  const stuff = await DailyLearningStuff.find({});

  let stuffToBeUpdated = stuff.find((item) => item.date === body.date);

  if (stuffToBeUpdated !== undefined) {
    stuffToBeUpdated.items = stuffToBeUpdated.items.concat(body.item);

    const updatedStuff = await DailyLearningStuff.findByIdAndUpdate(
      stuffToBeUpdated._id,
      stuffToBeUpdated,
      {
        new: true
      }
    );

    const TagedStuff = {
      ...updatedStuff.toJSON(),
      wasUpdated: true
    };

    res.json(TagedStuff);
  } else {
    const newstuff = new DailyLearningStuff({
      date: body.date,
      items: body.item
    });

    const savedStuff = await newstuff.save();
    res.json(savedStuff.toJSON());
  }
});

dailyLearningStuffRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const recordUnit = await DailyLearningStuff.findOne({ "items._id": id });

  await recordUnit.items.id(id).remove();
  await recordUnit.save();

  res.send("Deleted!");
});

module.exports = dailyLearningStuffRouter;
