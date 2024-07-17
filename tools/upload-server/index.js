const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const {rimrafSync} = require('rimraf')
const app = express();

const PORT = 8000;
const uploadDir = __dirname + '/uploads/'

console.log('clearing files...')
rimrafSync('./uploads/*', {glob: true})
console.log('clearing done!')

app.use(cors())
app.use(fileUpload());
app.use('/files', express.static('uploads'))

// http://localhost:8000/upload
app.post('/upload', function (req, res) {
  let file;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files);

  file = req.files.file;

  uploadPath = uploadDir + file.name;

  file.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send({
      uploadPath,
      publicUrl: `http://localhost:8000/files/${file.name}`
    });
  });
});

app.listen(PORT, function () {
  console.log('Express server listening on port ', PORT);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  app.close(() => {
    console.log('HTTP server closed')
  })
})
