var chai = require('chai'),
    main = require('./main.js');
    expect = require('chai').expect;

console.log("testing main.js");

describe('testing JSON object', function(){

  before(function () {
    var input = main.begin();
    var output = main.outputs();
    console.log("TEST outputs: "  + output + " \n \n \n ");
  });

  it('is a valid JSON object', function(){
    expect(output).to.be.a('array');
  });
  it('should not be empty array', function(){
    expect(output).to.not.be.empty;
  });
  it('has the spec keys', function(){
    expect(output).to.have.all.keys('url', 'headline', 'imageUrl', 'byLine');
  });

});


