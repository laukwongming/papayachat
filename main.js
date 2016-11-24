global.reqlib = require('app-root-path').require;
let app = reqlib('/app/App');

app.getInstance().run();


