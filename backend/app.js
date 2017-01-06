'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('express-jwt'),
    cors = require('cors'),
    twilio = require('twilio'),
    config = require('./config'),
    DbCon = require('./DbCon');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var clientId;

var authenticate = jwt({
  secret: new Buffer('8ESodHfxRNW-SqMdJ--mIwDRT7fCfhh4mhAO_ObYbHtz5XHTzbE2a-gjY8ffiVr-', 'base64'),
  audience: 'TUo0Y0t8YJ4v03cAcaIvoex7oIj5BecZ'
});

var client = twilio('AC92dd0511c473ba5840f39ab9eb531167', 'a18f3515bb41fea18bdf0f5c917524dc');

module.exports = {app: app, server: server};

app.use(cors());

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

// Protected endpointes
app.use('/api/products', authenticate);
app.use('/api/categories', authenticate);
app.use('/api/dealer', authenticate);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
  }
});

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
app.post('/api/dealer', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  var name = req.body.name;
  var lat = req.body.lat;
  var lng = req.body.lng;
  var phone = req.body.phone;
  var address = req.body.address;
  var city = req.body.city;

  var cb = function() {
    return res.sendStatus(200);
  };

  db.setDealer(name, lat, lng, phone, address, city, cb);
});


app.put('/api/order', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  var orderNumber = req.body.orderid;
  var items = req.body.items;

  items.forEach(function(item) {
    db.setInvoicedQuantity(orderNumber, item.productID, item.categoryID, item.invoicedQuantity);
  });

  // client.sendMessage({
  //   to: '+94775286997',
  //   from: '+13347815502',
  //   body: 'Your order with order number %s has successfully been placed' % orderNumber
  // });

  return res.sendStatus(200);

});

app.put('/api/update/products', jsonParser, function(req, res) {
  var cb = function() {
    res.sendStatus(200);
  };

  var data = req.body.data.split(',');
  db.updateProducts(Number(data[0]), data[1], data[2], cb);

});

app.put('/api/update/categories', jsonParser, function(req, res) {
  var cb = function() {
    res.sendStatus(200);
  };

  var data = req.body.data.split(',');
  db.updateCategories(Number(data[0]), data[1], cb);

});

app.put('/api/update/reps', jsonParser, function(req, res) {
  var cb = function() {
    res.sendStatus(200);
  };

  var data = req.body.data.split(',');
  db.updateReps(data[0], data[1], data[2], cb);
});


app.post('/api/order', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  var epoch = req.body.epoch;
  var dealerID = req.body.dealerID;
  var repID = req.body.repID;
  var locationStatus = req.body.atLocation; //0 means order was placed remotely from dealer's location
  var itemLst = req.body.items;
  var orderId;
  var sign = req.body.signature;
  var remote = req.body.remote;


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

  db.setOrderInfo(epoch, sign, remote, orderInfoCb);
});

app.get('/:v', function(req, res) {
  res.render(req.params.v);
});

app.get('/', function(req, res) {
  res.render('layout', {
    title: 'Dankotuwa'
  });
});
