
'use strict';
var morgan = require('morgan'),
    express = require('express'),
    request = require('request'),
    app = express(),
    url = 'http://www.cnn.com/data/ocs/section/index.html:homepage1-zone-1.json',
    finalProduct = [],
    topStories = [];

app.use(morgan('combined'));

begin();

  // used the request module to ping CNN.com for JSON data
  // if no error and status is 200 store the JSON object to a variable
  // parsed JSON object to allow manipulation of the object
  // stores the entire JSON object to the global variable
function begin() {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var parsedJSONres = JSON.parse(body);
            extractValues(parsedJSONres);
            getURL(topStories);
        } else {
            console.log(response.statusCode);
        }
    });
}

  // pulls out only the objects within zoneContents 'container' and 'Top stories'
  // keys. Are the elements desired always in the zoneContents object? if not
  // this method fails
function extractValues(parsedJSONres) {
    topStories = [];
    parsedJSONres.zoneContents.forEach( function (content) {
        if (content.type == 'container' && content.title == 'Top stories') {
            topStories = content.containerContents;
            return;
        } else {
            return {error: 'no Top Stories'} ;
        }
    });
    return JSON.stringify(topStories, null, 4);
}

// using string concatination to creat the final json object for printing to
// the console.  Refacter to do this with .push
function getURL(topStories)   {
    topStories.forEach( function (stories) {
        finalProduct += '{\"url\": \"http://www.cnn.com' + stories.cardContents.url + '\", \"headline\": \"' + stories.cardContents.headlinePlainText + '\", \"imageUrl\": \"' + stories.cardContents.media.elementContents.cuts["full16x9"].uri + '\", \"byLine\": \"' + stories.cardContents.auxiliaryText + '\" },';
    });

    console.log(finalProduct);
    return  (finalProduct);
}

// exports are breaking the app.  Need to investigate more.  The .forEach ln 52
// throws TypeError: Cannot read property 'forEach' of undefined.

// // exports.begin = begin();
// // exports.getURL = getURL();
// // exports.extractValues = extractValues();
// exports.finalProduct = finalProduct;
// // exports.topStories = topStories;


