'use strict';

var mysql = require('mysql');

var DbCon = function (cred) {
  this.credentials = cred;
};

DbCon.prototype.init = function () {

  var self = this;
  this.con = mysql.createConnection(this.credentials);

  this.con.connect(function(err) {
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(self.init, 2000);
    }
  });

  this.con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      self.init();
    } else {
      throw err;
    }
  });
};

DbCon.prototype.getReps = function(cb) {
  this.con.query('SELECT * FROM sales_representative', function(err,rows){
    if(err) throw err;

    cb(rows);
  });
};

DbCon.prototype.getProducts = function(cb) {
  this.con.query('SELECT ProductID, ProductName FROM product', function(err,rows){
    if(err) throw err;

    cb(rows);
  });
};

DbCon.prototype.getCategories = function(cb) {
  this.con.query('SELECT CategoryID, CategoryName FROM category', function(err,rows){
    if(err) throw err;

    cb(rows);
  });
};

DbCon.prototype.getSignature = function(oid, cb) {
  this.con.query('SELECT sign FROM order_info WHERE OrderNumber='+oid+';', function(err,rows){
    if(err) throw err;

    cb(rows[0]);
  });
};

DbCon.prototype.getOrdersByUser = function(repid, cb) {
  this.con.query('SELECT order_info.OrderNumber, Epoch, product.ProductID, category.CategoryID,ProductName, CategoryName, Quantity,dealer.Name, dealer.DealerID, sales_representative.Name AS repName FROM order_info, order_product, dealer_rep_order, dealer, product, category, sales_representative where order_info.OrderNumber IN (SELECT OrderNumber FROM dealer_rep_order where EmployeeID='+repid+') AND order_info.OrderNumber=order_product.OrderNumber AND order_info.OrderNumber=dealer_rep_order.OrderNumber AND dealer.DealerID=dealer_rep_order.DealerID AND order_product.ProductID = product.ProductID AND order_product.CategoryID = category.CategoryID AND sales_representative.EmployeeID = '+repid+';', function(err,rows){
    if(err) throw err;

    var data = {};
    var response = [];
    rows.forEach(function(order) {
      var d = {"productID": order.ProductID, "productName": order.ProductName, "categoryID": order.CategoryID, "categoryName": order.CategoryName, "quantity": order.Quantity};
      if (order.OrderNumber in data) {
        data[order.OrderNumber].items.push(d);
      } else {
        data[order.OrderNumber] = {"repID": repid, "repName": order.repName, "orderNumber":order.OrderNumber, "epoch": order.Epoch, "name": order.Name, "dealerID": order.DealerID, "items": [d]};
      }
    });
    for (var key in data) {
      response.push(data[key]);
    }
    cb(response);
  });
};


DbCon.prototype.setInvoicedQuantity = function(orderID, productID, categoryID, invoicedQuantity) {
  this.con.query('UPDATE order_product SET InvoicedQuantity = ? WHERE OrderNumber = ? AND ProductID = ? AND CategoryID = ?', [invoicedQuantity, orderID, productID, categoryID], function(err, rows) {
    if(err) throw err;
  });
};

DbCon.prototype.setOrderInfo = function(epoch, signature, cb) {
  this.con.query('INSERT INTO order_info SET ?', {Epoch: epoch, sign: signature }, function(err,rows){
    if(err) throw err;

    cb(rows.insertId);
  });
};

DbCon.prototype.setOrderProduct = function(orderID, productID, categoryID, quantity) {
  this.con.query('INSERT INTO order_product SET ?', {OrderNumber: orderID, ProductID: productID, CategoryID: categoryID, Quantity: quantity}, function(err,rows){
    if(err) throw err;

  });
};

DbCon.prototype.setDealerRepOrder = function(orderID, repID, dealerID, locationStatus, cb) {
  this.con.query('INSERT INTO dealer_rep_order SET ?', {OrderNumber: orderID, EmployeeID: repID, DealerID: dealerID, Correct_location: locationStatus}, function(err,rows){
    if(err) throw err;

    cb();
  });
};




module.exports = DbCon;

