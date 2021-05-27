// const http = require("http")
const formidable = require('formidable')
const fileUploadRouter = require('express').Router()

// fileUploadRouter.setHeader('Access-Control-Allow-Origin', '*')
// fileUploadRouter.setHeader('Access-Control-Allow-Headers', 'Content-Type')
// fileUploadRouter.setHeader('Content-Type', 'application/json')

fileUploadRouter.options('/', (req, res) => {
    res.status = 200
    res.end()
})

function isFormData(req) {
    const type = req.headers['content-type'] || ''
    console.log(type)
    return type.includes('multipart/form-data')
}

function upload(req, res) {
    if (!isFormData(req)) {
        console.log(req.headers)
        res.statusCode = 203
        res.end('错误的请求，请使用multipart/form-data格式')
        return
    }

    const form = new formidable.IncomingForm()
    form.uploadDir = './image'
    form.keepExtension = true

    form.on('field', (field, value) => {
        console.log(field)
        console.log(value)
    })

    form.on('end', () => {
        console.log('上传完成')
    })

    form.parse(req)
}

fileUploadRouter.post('/', (req, res) => {
    upload(req, res)
})

module.exports = fileUploadRouter