var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:8080");
var app = require('../app').listen(8080);

// UNIT test begin

describe("API endpoints :",function(){

  after(function (done) {
    app.close();
    done();
  });

  it("should return product list",function(done){

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

  it("should return category list",function(done){

    server
    .get('/api/categories')
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);      
      res.body[0].should.have.property('CategoryID').which.is.a.Number();
      res.body[0].should.have.property('CategoryName');
      done();
    });
  });
  it("should return category list",function(done){

    server
    .get('/api/categories')
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);      
      res.body[0].should.have.property('CategoryID').which.is.a.Number();
      res.body[0].should.have.property('CategoryName');
      done();
    });
  });
  it("should return category list",function(done){

    server
    .get('/api/reps')
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);      
      res.body[0].should.have.property('EmployeeID').which.is.a.Number();
      res.body[0].should.have.property('UserName');
      done();
    });
  });

});