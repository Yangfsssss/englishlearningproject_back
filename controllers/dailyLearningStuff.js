const dailyLearningStuffRouter = require("express").Router();
const DailyLearningStuff = require("../models/dailyLearningStuff");

dailyLearningStuffRouter.get("/", async (req, res) => {
  const dailyLearningStuff = await DailyLearningStuff.find({});
  res.json(
    dailyLearningStuff.map((dailyLearningStuff) => dailyLearningStuff.toJSON())
  );
});

dailyLearningStuffRouter.post("/", async (req, res) => {
  const body = req.body;

  const stuff = new DailyLearningStuff({
    date: body.date,
    memo: body.memo,
    url: body.url
  });

  const savedStuff = await stuff.save();
  res.json(savedStuff.toJSON());
});

module.exports = dailyLearningStuffRouter;
