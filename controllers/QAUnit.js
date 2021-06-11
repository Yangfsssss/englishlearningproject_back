const QAUnitRouter = require("express").Router();
const QAUnit = require("../models/QAUnit");

class Response {
  constructor(success = false, result = null, errorCode = 1, errorMsg = "") {
    this.success = success;
    this.result = result;
    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
  }
}

QAUnitRouter.get("/", async (req, res) => {
  const QAUnits = await QAUnit.find({});

  let response;

  if (QAUnits) {
    response = new Response(
      true,
      QAUnits.map((QAUnit) => QAUnit.toJSON())
    );
    console.log(response);
    res.status(200).send(response);
  } else {
    response = new Response(false, null, 0, res);
    res.status(404).json(response);
  }
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
