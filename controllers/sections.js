const sectionsRouter = require("express").Router();
// const jwt = require("jsonwebtoken");
const Section = require("../models/section");
const User = require("../models/user");

sectionsRouter.get("/", async (req, res) => {
  const sections = await Section.find({});
  res.json(sections.map((section) => section.toJSON()));
});

sectionsRouter.post("/", async (req, res) => {
  const body = req.body;

  const user = await User.findById(body.userId);

  const section = new Section({
    date: body.date,
    items: {
      title: body.items.title,
      url: body.items.url,
      wordUnits: body.items.wordUnits
    },
    user: user._id
  });

  const savedSection = await section.save();
  user.sections = user.sections.comcat(savedSection._id);
  await user.save();

  res.json(savedSection.toJSON());
});

module.exports = sectionsRouter;
