var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8080");

// UNIT test begin

describe("Endpoint: /api/product/",function(){

  var app = require('../app');
  beforeEach(function(){
    app.listen(8080);
  });

  it("should return product list",function(done){

    //calling ADD api
    server
    .get('/api/products')
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);      
      res.body[0].should.have.property('ProductID').which.is.a.Number();
      res.body[0].should.have.property('ProductName');
      done();
    });
  });

});
