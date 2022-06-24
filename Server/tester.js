// Node packages for file system
var fs = require("fs");
var path = require("path");

var filePath = path.join(__dirname, "./Data.csv");
// Read CSV
var f = fs.readFileSync(filePath, { encoding: "utf-8" }, function (err) {
  console.log(err);
});

// Split on row
f = f.split("\n");

// Get first row for column headers
headers = f.shift().split(",");

var json = [];
f.forEach(function (d) {
  // Loop through each row
  tmp = {};
  row = d.split(",");
  for (var i = 0; i < headers.length; i++) {
    tmp[headers[i]] = row[i];
  }
  // Add object to list
  json.push(tmp);
});

var outPath = path.join(__dirname, "./output.json");
// Convert object to string, write json to file
fs.writeFileSync(outPath, JSON.stringify(json), "utf8", function (err) {
  console.log(err);
});

// 'use strict'

// const Fs = require('fs')
// const Path = require('path')
// const Axios = require('axios')

// async function downloadImage (imgUrl, imgName) {
//   const url = imgUrl
//   const path = Path.resolve(__dirname, 'images', imgName)
//   const writer = Fs.createWriteStream(path)

//   const response = await Axios({
//     url,
//     method: 'GET',
//     responseType: 'stream'
//   })

//   response.data.pipe(writer)

//   return new Promise((resolve, reject) => {
//     writer.on('finish', resolve)
//     writer.on('error', reject)
//   })
// }

// downloadImage('https://www.malanijewelers.com/TransactionImages/Styles/Large/43008453.jpg', '43008453.jpg')
