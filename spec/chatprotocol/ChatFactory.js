const Login = require('./PTL20000.js');

exports.make = function(type){
    if(type === 20000){
        return new PTL20000();
    }



    return null;
}