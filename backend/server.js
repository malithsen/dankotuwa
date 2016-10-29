var app = require('./app').app;
var server = require('./app').server;

var port = process.env.PORT || 8080;
server.listen(port, function() {
  console.log("Listening on port " + port);
});
