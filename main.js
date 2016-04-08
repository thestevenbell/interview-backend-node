
// 'use strict';
var morgan = require('morgan');
var express = require('express');
var request = require('request');


var app = express();

// app.locals.newsfeed = require('./newsfeed.json');

app.use(morgan('combined'));


var url = 'http://www.cnn.com/data/ocs/section/index.html:homepage1-zone-1.json';
var finalProduct = [];
var topStories = [];


  // used the request module to ping CNN.com for JSON data
  // if no error and status is 200 store the JSON object to a variable
  // parsed JSON object to allow manipulation of the object
  // stores the entire JSON object to the global variable
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var parsedJSONres = JSON.parse(body);
    extractValues(parsedJSONres);
    getURL(topStories);
  }
  else {
    console.log(response.statusCode);
  }
});

// pulls out only the objects within zoneContents 'container' and 'Top stories'
// keys. Are the elements desired always in the zoneContents object? if not
// this method fails
function extractValues(parsedJSONres) {
    topStories = [];
    parsedJSONres.zoneContents.forEach( function (content) {
        if (content.type == 'container' && content.title == 'Top stories') {
            topStories = content.containerContents;
            return;
        }
        else{
          return {"error": "no Top Stories"} ;
        }
    });

    return JSON.stringify(topStories, null, 4);
}

function getURL(topStories){
  var topStoriesUrl = [];
  var headline = [];
  var byLine = [];
  var imageUrl = [];
  topStories.forEach( function (stories) {
    topStoriesUrl.push({url: stories.cardContents.url});
    headline.push({headline: stories.cardContents.headlinePlainText});
    imageUrl.push({imageUrl: stories.cardContents.media.elementContents.cuts["full16x9"].uri});
    byLine.push({byLine: stories.cardContents.auxiliaryText});
    finalProduct += '{\"url\": \"http://www.cnn.com' + stories.cardContents.url + '\", \"headline\": \"' + stories.cardContents.headlinePlainText + '\", \"imageUrl\": \"' + stories.cardContents.media.elementContents.cuts["full16x9"].uri + '\", \"byLine\": \"' + stories.cardContents.auxiliaryText + '\" },';
  });
    // console.log(JSON.stringify(topStoriesUrl));
    // console.log(JSON.stringify(headline));
    // console.log(JSON.stringify(byLine));
    // console.log(JSON.stringify(imageUrl));
    console.log(finalProduct);
}


