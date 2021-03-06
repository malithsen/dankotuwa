var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:8080");
var app = require('../app').app.listen(8080);

describe("API endpoints :",function(){

  after(function (done) {
    app.close();
    done();
  });

  it("GET /api/products should return 401 with invalid token error",function(done){

    server
    .get('/api/products')
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      res.text.should.be.equal('Invalid token');
      done();
    });
  });

  it("GET /api/category should return 401 with invalid token error",function(done){

    server
    .get('/api/categories')
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      res.text.should.be.equal('Invalid token');
      done();
    });
  });

  it("GET /api/rep should return reps list",function(done){

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

  it("GET /api/orders/rep/:id should return orders by rep id",function(done){

    server
    .get('/api/orders/rep/1')
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.should.have.property('1').which.is.a.Object();
      res.body['1'].should.have.property('epoch').which.is.a.Number();
      res.body['1'].should.have.property('items').which.is.a.Array();
      done();
    });
  });

  it("GET /api/order/signature/:orderid should return dealer's signature",function(done){

    server
    .get('/api/order/signature/1')
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.should.have.property('sign').which.is.a.String();
      done();
    });
  });

  it('POST /api/order should post order', function(done) {
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
  it('POST /api/dealer without token should return an error', function(done) {
    server
      .post('/api/dealer')
      .send({"name":'test user',"lat":12312312,"lng":12312312,"phone":123456789,"address":"Fake address", "city": "Fake city"})
      .expect(401)
      .end(function(err, res) {
        if (err) done(err);
        res.text.should.be.equal('Invalid token');
        done();
      });
  });
  it('PUT /api/update/reps should update sales rep table', function(done) {
    server
      .put('/api/update/reps')
      .send({"data":"Fake name,fakeusername, fake@email.com"})
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);
        res.text.should.be.equal('OK');
        done();
      });
  });
  it('PUT /api/update/products should update the product', function(done) {
    server
      .put('/api/update/products')
      .send({"data": "0,test product, 0"})
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);
        res.text.should.be.equal('OK');
        done();
      });
  });
  it('PUT /api/update/category should update the category', function(done) {
    server
      .put('/api/update/categories')
      .send({"data": "0,test category, 0"})
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);
        res.text.should.be.equal('OK');
        done();
      });
  });

});
