global.reqlib = require('app-root-path').require;
global.PPYC_ERROR_CODE = reqlib('/error/Error.js').ERROR;
//global.mongooseDB = reqlib('/config/db/connection.js').mongoose;

let app = reqlib('/app/App');

let User = reqlib('/app/model/User.js');
app.getInstance().run();


