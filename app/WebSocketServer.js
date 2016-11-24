const  WSS  = require('websocket').server;
const  http = require('http');

const  ChatConnection = reqlib('/app/ChatClient.js');
const  ChatUsersContainer    = reqlib('/app/ChatUsersContainer.js');

class WebSocketServer {
    constructor(ip,port){
        this._ip            = ip;
        this._port          = port;
        this._httpServer    = null;
        this._wsServer      = null;
    }

    start(){
        this._httpServer    = this.createHttpServer(this._port);
        this.wsServer       = this.createWebSocket(this._httpServer);
    }

    createHttpServer(port){
        let httpServer = http.createServer((request,response)=>{
            response.writeHead(404);
            response.end();
        });

        httpServer.listen(port, ()=>{
            console.log((new Date()) + ' Server is listening on port ' + port);
        });

        return httpServer;
    }

    createWebSocket(httpServer){
        let wsServer = new WSS({
            httpServer: httpServer,
            autoAcceptConnections: false
        });

        wsServer.on('request', function(request) {
            if (!this.originIsAllowed(request.origin)) {
                request.reject();
                return;
            }

            //connection successful
            let connection = request.accept('echo-protocol', request.origin);
            let chatClient = new ChatClient();
            chatClient.bindConnection(connection);
        });

        return wsServer;
    }


    originIsAllowed(origin) {
        return true;
    }

}

module.exports = WebSocketServer;
