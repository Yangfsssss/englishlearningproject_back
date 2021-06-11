const userRouter = require("express").Router();
const User = require("../models/user");
// const bcrypt = require("bcrypt");

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

userRouter.post("/login", async (req, res) => {
  const { username } = req.body;

  const isUsernameExist = await User.findOne({ username });

  isUsernameExist
    ? res.status(200).json(username)
    : res.status(201).json(username);
});

userRouter.post("/signup", async (req, res) => {
  const body = req.body;

  // const saltRounds = 10;
  // const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username
    // passwordHash
  });

  console.log(user);

  const savedUser = await user.save();

  console.log(savedUser);

  res.status(200).json(savedUser);
});

module.exports = userRouter;
