const sectionsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Section = require('../models/section')

sectionsRouter.get('/', async (req, res) => {
  const sections = await Section.find({})
  res.json(sections.map((section) => section.toJSON()))
})

sectionsRouter.post('/', async (req, res) => {
  const body = req.body

  const section = new Section({
    url: body.url,
    words: body.words,
  })

  const savedSection = await section.save()
  res.json(savedSection.toJSON())
})

module.exports = sectionsRouter
