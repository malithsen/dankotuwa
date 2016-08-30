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

  it("/api/products should return product list",function(done){

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

  it("/api/category should return category list",function(done){

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
  it("/api/rep should return reps list",function(done){

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
  it('/api/order should post order', function(done) {
    server
      .post('/api/order')
      .send({"epoch":1472210342,"repID":3,"dealerID":1,"atLocation":1,"items":[{"product":{"ProductID":2,"ProductName":"Salad plate"},"category":{"CategoryID":2,"CategoryName":"Livy"},"quantity":2}]}) 
      .expect(200)
      .end(function(err, res) {
        console.log(res.text);
        if (err) done(err);
        res.text.should.be.equal('OK');
        //res.body.participant.should.have.property('nuid', '98ASDF988SDF89SDF89989SDF9898');
        done();
      });
  });

});