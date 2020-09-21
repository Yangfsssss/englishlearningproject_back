const sectionsRouter = require("express").Router();
// const jwt = require("jsonwebtoken");
const Section = require("../models/section");

sectionsRouter.get("/", async (req, res) => {
  const sections = await Section.find({});
  res.json(sections.map((section) => section.toJSON()));
});

sectionsRouter.post("/", async (req, res) => {
  const body = req.body;
  console.log(body);

  const section = new Section({
    date: body.date,
    items: {
      title: body.items.title,
      url: body.items.url,
      wordUnits: body.items.wordUnits
    }
  });

  console.log(section);

  const savedSection = await section.save();
  res.json(savedSection.toJSON());
});

module.exports = sectionsRouter;
