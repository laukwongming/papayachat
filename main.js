global.reqlib = require('app-root-path').require;
global.PPYC_ERROR_CODE = reqlib('/error/Error.js').ERROR;
//global.mongooseDB = reqlib('/config/db/connection.js').mongoose;

let app = reqlib('/app/App');

let milliseconds = (new Date).getTime();

console.log(milliseconds);
const UserModel = reqlib('/app/model/User.js');

UserModel.findByAidAndPwInDB('1','123',x=>{
    console.log(x.at);
});



app.getInstance().run();


