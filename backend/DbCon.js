'use strict';

var mysql = require('mysql');

var DbCon = function (cred) {
  this.credentials = cred;
};

DbCon.prototype.init = function () {
  this.con = mysql.createConnection(this.credentials);

  this.con.connect();
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

DbCon.prototype.getOrdersByUser = function(repid, cb) {
  this.con.query('SELECT order_info.OrderNumber, Epoch, ProductID, CategoryID FROM order_info, order_product where order_info.OrderNumber IN (SELECT OrderNumber FROM dealer_rep_order where EmployeeID='+repid+') AND order_info.OrderNumber=order_product.OrderNumber;', function(err,rows){
    if(err) throw err;

    var data = {};
    rows.forEach(function(order) {
      var d = {"ProductID": order.ProductID, "CategoryID": order.CategoryID};
      if (order.OrderNumber in data) {
        data[order.OrderNumber].items.push(d);
      } else {
        data[order.OrderNumber] = {"epoch": order.Epoch, "items": [d]};
      }
    });
    cb(data);
  });
};

DbCon.prototype.setOrderInfo = function(epoch, cb) {
  this.con.query('INSERT INTO order_info SET ?', {Epoch: epoch}, function(err,rows){
    if(err) throw err;

    cb(rows.insertId);
  });
};

DbCon.prototype.setOrderProduct = function(orderID, productID, categoryID, quantity, cb) {
  this.con.query('INSERT INTO order_product SET ?', {OrderNumber: orderID, ProductID: productID, CategoryID: categoryID, Quantity: quantity}, function(err,rows){
    if(err) throw err;

    cb();
  });
};

DbCon.prototype.setDealerRepOrder = function(orderID, repID, dealerID, locationStatus, cb) {
  this.con.query('INSERT INTO dealer_rep_order SET ?', {OrderNumber: orderID, EmployeeID: repID, DealerID: dealerID, Correct_location: locationStatus}, function(err,rows){
    if(err) throw err;

    cb();
  });
};



module.exports = DbCon;

