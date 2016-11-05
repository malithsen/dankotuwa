'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    DbCon = require('./DbCon');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var clientId;

module.exports = {app: app, server: server};

io.on('connection', function(socket){
  console.log('a user connected', socket.id);
  clientId = socket.id;
});

function notifyClient(repID) {
  io.to(clientId).emit('order', {'repID': repID});
}

app.use(require('morgan')('combined'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// create application/json parser
var jsonParser = bodyParser.json();

app.set('views', __dirname + '/src/views');
app.set('view engine', 'jade');
app.locals.pretty = true;

app.use(express.static(__dirname + '/public'));

var db = new DbCon(config.sql.credentials);
db.init();

app.get('/api/reps', function(req, res) {
  var cb = function(data) {
    res.json(data);
  };

  db.getReps(cb);

});

app.get('/api/products', function(req, res) {
  var cb = function(data) {
    res.json(data);
  };

  db.getProducts(cb);

});

app.get('/api/categories', function(req, res) {
  var cb = function(data) {
    res.json(data);
  };

  db.getCategories(cb);

});

app.get('/api/orders/rep/:rep', function(req, res) {
  var repid = req.params.rep;

  var cb = function(data) {
    res.json(data);
  };
  db.getOrdersByUser(repid, cb);
});

app.get('/api/order/signature/:orderid', function(req, res) {
  if (!req.params.orderid) return;
  var oid = req.params.orderid;

  var cb = function(data) {
    res.json(data);
  };
  db.getSignature(oid, cb);
});

// app.get('/api/orders/after/:time', function(req, res) {
//   var cb = function(data) {
//     res.json(data);
//   };
//   //db.getUsers()
// });

// app.get('/api/order/:id', function(req, res) {
//   var cb = function(data) {
//     res.json(data);
//   };
//   //db.getUsers()
// });

// app.get('/api/rep/:repid', function(req, res) {
//   var cb = function(data) {
//     res.json(data);
//   };
//   //db.getUsers()
// });

// app.get('/api/rep/:repid/:to/:from', function(req, res) {
//   var cb = function(data) {
//     res.json(data);
//   };
//   //db.getUsers()
// });

// app.get('/api/rep/location/:repid', function(req, res) {
//   var cb = function(data) {
//     res.json(data);
//   };
//   //db.getUsers()
// });

// app.post('/api/rep/hours/:repid/', function(req, res) {
//   var cb = function(data) {
//     res.json(data);
//   };
//   //db.getUsers()
// });

app.post('/api/order', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  var epoch = req.body.epoch;
  var dealerID = req.body.dealerID;
  var repID = req.body.repID;
  var locationStatus = req.body.atLocation; //0 means order was placed remotely from dealer's location
  var itemLst = req.body.items;
  var orderId;
  var sign = req.body.signature;


  var successCb = function() {
    notifyClient(repID); //send a notification to webapp
    return res.sendStatus(200);
  };

  var dealerRepOrderCb = function() {
    setProducts();
    successCb();
  };

  var orderInfoCb = function(id) {
    orderId = id;
    db.setDealerRepOrder(id, repID, dealerID, locationStatus, dealerRepOrderCb);
  };

  var setProducts = function() {
    itemLst.forEach(function(item){
      db.setOrderProduct(orderId, item.product.ProductID, item.category.CategoryID, item.quantity);
    });
  };

  db.setOrderInfo(epoch, sign, orderInfoCb);
});

app.get('/views/:v', function(req, res) {
  res.render(req.params.v);
});

app.get('/', function(req, res) {
  res.render('layout', {
    title: 'Dankotuwa'
  });
});
