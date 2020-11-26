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
  console.log(body);

  // const user = await User.findById(body.userId);

  const sections = await Section.find({});

  let sectionToBeHandled = sections.find(
    (section) => section.date === body.date
  );

  if (sectionToBeHandled !== undefined) {
    sectionToBeHandled.items = sectionToBeHandled.items.concat(body.item);

    const updatedSection = await Section.findByIdAndUpdate(
      sectionToBeHandled._id,
      sectionToBeHandled,
      { new: true }
    );

    res.status(201).json(updatedSection.toJSON());
  } else {
    const section = new Section({
      date: body.date,
      items: [body.item]
      // user: "admin"
    });

    const newSection = await section.save();
    res.status(200).json(newSection.toJSON());
  }

  // user.sections = user.sections.concat(savedSection._id);
  // await user.save();
});

module.exports = sectionsRouter;
