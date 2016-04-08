var should = require("chai").should(),
    expect = require("chai").expect,
    supertest = require("supertest"),
    api = supertest("http://localhost:3000"),



describe('JSON', function(){
  it("should return a JSON object", function(done){

  });

  it("should return an array", function(done){
    api
      .get('http://www.cnn.com/data/ocs/section/index.html:homepage1-zone-1.json')
      .set("Accept", "application/json")
      .end(function(error, response){
        expect(response.body).to.be.an('array');
        done();
    });
  });

});
