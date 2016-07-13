'use strict';

var mysql = require('mysql');

var DbCon = function (cred) {
  this.credentials = cred;
};

DbCon.prototype.init = function () {
  this.con = mysql.createConnection(this.credentials);

  this.con.connect();
};

DbCon.prototype.getUsers = function(cb) {
  this.con.query('SELECT * FROM users',function(err,rows){
    if(err) throw err;

    console.log('Data received from Db:\n');
    cb(rows);
  });
};

module.exports = DbCon;

