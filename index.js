var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
// const fs = require('fs');
// const os = require('os')


var PORT = 4000;
var app = express();
app.use(cors());
app.use(bodyParser())


app.post('/sendData', (req, res, next) => {
    console.log('hey');
    createExcel('something.xlsx', req.body)
    .then((ans) => {
      res.status(200).send("success")
    },(error) => {
      console.log('error writting data')
      res.status(500).send('error writting data')
    })
    .catch((error) => {
      console.log('errror')
      res.status(500).send('error writting data')
    });
});

createExcel = (filename, data) => {
  const workbook = new ExcelJS.Workbook();
  return workbook.xlsx.readFile(filename)
    .then(() => {
      console.log('File exists');
      var sheet = workbook.getWorksheet('My Sheet');
      const columns = [];
      for( el in data ) {
        columns.push({ header: el, key: el })
      }
      sheet.columns = columns;
      sheet.addRow(data);
    },() => {
      console.log('File not exists');
      const sheet = workbook.addWorksheet('My Sheet');
      const columns = [];
      for( el in data ) {
        columns.push({ header: el, key: el });
      }
      sheet.columns = columns;
      sheet.addRow(data);
    })
    .then(() => 
      workbook.xlsx.writeFile(filename)
    )
}

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`)
});