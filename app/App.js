"use strict";
const EventEmitter = require("events").EventEmitter;
const WebSocket = reqlib('/app/WebSocketServer');

class App extends EventEmitter{

    static getInstance() {
        if (!App._instance) {
            App._instance = new App();
        }
        return App._instance;
    }

    constructor() {
        super();
        this.isrun = false;
        this.chatServer = new WebSocket("127.0.0.1",20010);
    }

    run(){
        if(this.isrun) return;
        this.isrun = true;
        this.chatServer.start();
    }
}


module.exports = App;
