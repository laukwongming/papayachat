let mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/papayachat';

mongoose.connect(url);

exports.mongoose = function(){
    return mongoose;
}