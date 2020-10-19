const QAUnitRouter = require("express").Router();
const QAUnit = require("../models/QAUnit");

QAUnitRouter.get("/", async (req, res) => {
  const QAUnits = await QAUnit.find({});
  res.json(QAUnits.map((QAUnit) => QAUnit.toJSON()));
});

QAUnitRouter.post("/", async (req, res) => {
  const body = req.body;

  const newQAUnit = new QAUnit({
    date: body.date,
    type: body.type,
    question: body.question,
    answer: body.answer
  });

  const savedQAUnit = await newQAUnit.save();
  res.json(savedQAUnit.toJSON());
});

module.exports = QAUnitRouter;
