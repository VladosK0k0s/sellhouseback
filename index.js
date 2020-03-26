var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var json2csv = require('json2csv');
const fs = require('fs');
const os = require('os')


var PORT = 4000;
var app = express();
app.use(cors());
app.use(bodyParser())


app.post('/sendData', (req, res, next) => {
    console.log('hey');
    // const csvWriter = createCsvWriter({
    //     path: 'file.csv',
    //     header: [
    //         {id: 'name', title: 'name'},
    //         {id: 'tel', title: 'tel'},
    //         {id: 'address', title: 'address'},
    //         {id: 'roomquantity', title: 'roomquantity'},
    //         {id: 'sqaremain', title: 'sqaremain'},
    //         {id: 'sqarelive', title: 'sqarelive'},
    //         {id: 'sqarekit', title: 'sqarekit'},
    //         {id: 'floor', title: 'floor'},
    //         {id: 'flooring', title: 'flooring'},
    //         {id: 'description', title: 'description'},
    //         {id: 'heating', title: 'heating'},
    //         {id: 'planning', title: 'planning'},
    //         {id: 'parking', title: 'parking'},
    //         {id: 'warming', title: 'warming'},
    //         {id: 'price', title: 'price'},
    //         {id: 'currency', title: 'currency'},
    //         {id: 'condition', title: 'condition'},
    //         {id: 'class', title: 'class'}
    //     ]
    // });
    // const records = [ req.body ];
    // csvWriter.writeRecords(records)       // returns a promise
    // .then(() => {
    //     console.log('...Done');
    //     return res.status(200).send('ho212oo');
    // });
    createCsv('something.csv', req.body, res)
});

const createCsv = (outputFilePath, data, res) => {
    const json2csvParser = new json2csv.Parser({
      header: true,
      fields: [
        'name',
        'tel',
        'address',
        'roomquantity',
        'walls',
        'sqaremain',
        'sqarelive',
        'sqarekit',
        'floor',
        'flooring',
        'description',
        'heating',
        'planning',
        'parking',
        'warming',
        'price',
        'currency',
        'condition',
        'class'
        ]
    });
    if (data) {
      const eol = os.EOL || "\n";
      const csv = eol + json2csvParser.parse(data);
      fs.appendFile(outputFilePath, csv, () => {
        res.status(200).send('1OK');
      });
    }
  };
  
const getCsvFromInputFile = async inputfilePath => {
    return csvtojson().fromFile(inputfilePath);
};


app.listen(PORT, () => {
    console.log(`App running on ${PORT}`)
});