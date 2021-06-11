class Response {
  constructor(success = false, result = null, errorCode = 1, errorMsg = "") {
    this.success = success;
    this.result = result;
    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
  }
}

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

module.exports = {
  Response,
  upload
};
