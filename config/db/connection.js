var mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/papayachat';
var options = {
  server: { poolSize: 5 }
}
mongoose.connect(url,options);

mongoose.connection.on("connected", function(ref) {
  console.log("Connected to DB");
});

// If the connection throws an error
mongoose.connection.on("error", function(err) {
  console.error('Failed to connect to DB ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection to DB ');
});


process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

exports.db = mongoose;
