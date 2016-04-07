// 'use strict';
var morgan = require('morgan');
var express = require('express');
var request = require('request');

var app = express();

// app.locals.newsfeed = require('./newsfeed.json');

app.use(morgan('combined'));


var url = 'http://www.cnn.com/data/ocs/section/index.html:homepage1-zone-1.json';

console.log('Request "GET" to url:' + url);

var cnnJSON = [];
// var str = [];

  // used the request module to ping CNN.com for JSON data
  // if no error and status is 200 store the JSON object to a variable
  // parsed JSON object to allow manipulation of the object
  // stores the entire JSON object to the global variable
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var parsedJSONres = JSON.parse(body);
    cnnJSON.push(parsedJSONres);
    // logoutcnnJSON();
    extractValues();
  }
  else {
    console.log(response.statusCode);
  }
});

// function logoutcnnJSON() {
//     console.log('cnnJSON: ' + cnnJSON);
//     str = JSON.stringify(cnnJSON, null, 4);
//     // console.log(str);
// }


function extractValues () {
  console.log(cnnJSON[0].zoneContents[0].id);

}





