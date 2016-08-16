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
  this.con.query('SELECT ProductName FROM product', function(err,rows){
    if(err) throw err;
    var data = [];
    rows.forEach(function(prod) {
      data.push(prod.ProductName);
    });

    cb(data);
  });
};

DbCon.prototype.getCategories = function(cb) {
  this.con.query('SELECT CategoryName FROM category', function(err,rows){
    if(err) throw err;
    var data = [];
    rows.forEach(function(category) {
      data.push(category.CategoryName);
    });

    cb(data);
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


module.exports = DbCon;

