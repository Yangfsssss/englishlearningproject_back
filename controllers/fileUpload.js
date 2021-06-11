// const http = require("http")
const formidable = require("formidable");
const fileUploadRouter = require("express").Router();
const { upload } = require("../utils/methods");

// fileUploadRouter.setHeader('Access-Control-Allow-Origin', '*')
// fileUploadRouter.setHeader('Access-Control-Allow-Headers', 'Content-Type')
// fileUploadRouter.setHeader('Content-Type', 'application/json')

fileUploadRouter.options("/", (req, res) => {
  res.status = 200;
  res.end();
});

fileUploadRouter.post("/", (req, res) => {
  upload(req, res);
});

module.exports = fileUploadRouter;
