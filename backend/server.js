'use strict';

var express = require('express'),
    config = require('./config'),
    DbCon = require('./DbCon');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
app.use(require('morgan')('combined'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.set('views', __dirname + '/src/views');
// app.set('view engine', 'jade');
// app.locals.pretty = true;

// app.configure( function() {
//   app.use(lessMiddleware({
//     dest:     __dirname + '/public/stylesheets',
//     src:      __dirname + '/src/less',
//     prefix:   '/stylesheets',
//     compress: true
//   }));

//   app.use(express.static(__dirname + '/public'));
// });

var db = new DbCon(config.sql.credentials);
db.init();

app.get('/api/reps', function(req, res) {
  var cb = function(data) {
    res.json(data);
  };

  db.getReps(cb);

});

app.get('/api/orders/rep/:rep', function(req, res) {
  var repid = req.params.rep;

  var cb = function(data) {
    res.json(data);
  };
  db.getOrdersByUser(repid, cb);
});

app.get('/api/orders/after/:time', function(req, res) {
  var cb = function(data) {
    res.json(data);
  };
  //db.getUsers()
});

app.get('/api/order/:id', function(req, res) {
  var cb = function(data) {
    res.json(data);
  };
  //db.getUsers()
});

app.get('/api/rep/:repid', function(req, res) {
  var cb = function(data) {
    res.json(data);
  };
  //db.getUsers()
});

app.get('/api/order/signature/:orderid', function(req, res) {
  var cb = function(data) {
    res.json(data);
  };
  //db.getUsers()
});

app.get('/api/rep/:repid/:to/:from', function(req, res) {
  var cb = function(data) {
    res.json(data);
  };
  //db.getUsers()
});

app.get('/api/rep/location/:repid', function(req, res) {
  var cb = function(data) {
    res.json(data);
  };
  //db.getUsers()
});

app.post('/api/rep/hours/:repid/', function(req, res) {
  var cb = function(data) {
    res.json(data);
  };
  //db.getUsers()
});

app.post('/api/order', function(req, res) {
  var cb = function(data) {
    res.json(data);
  };
  //db.getUsers()
});

app.get('/views/:v', function(req, res) {
  res.json(req.params.v);
});

app.get('*', function(req, res) {
  // res.render('layout', {
  //   title: 'Dankotuwa',
  //   env: process.env.NODE_ENV
  // });
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on port " + port);
});
