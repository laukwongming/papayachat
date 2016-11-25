"use strict";
const  schemaVaildate       = reqlib('/lib/helper/JsonSchemaValidation.js');
const  ChatFactory          = reqlib('/spec/chatprotocol/ChatFactory.js');
const  ChatUsersContainer   = reqlib('/app/ChatUsersContainer.js');
const  EventEmitter         = require("events").EventEmitter;

const schema =   {
    "type": "object",
    "properties": {
        "code": {
            "type": "integer"
        }
    },
    "required": ["code"]
};

class ChatClient extends EventEmitter{
    constructor(){
        this.on('rosterOnline',()=>{

        });

        this.on('rosterOffline',()=>{

        });
    }

    updateInfo(user){
        this.aid        = user.aid;
        this.nickname   = user.nickname;
        this.email      = user.email;
        this.roster     = user.roster;
    }

    usersContainer(){
        return ChatUsersContainer.getInstance();
    }

    bindConnection(con){
        this._connection        = con;
        this._connection.on('close', (reasonCode, description)=> {
            this.usersContainer().removeClient(this);
            this.emit('rosterOffline',this.aid);
        });

        this._connection.on('message', (message)=> {
            if(message.type !== 'utf8'){
                    this.close();
                    return;
            }
            this.messageRoute(message.utf8Data);
        });
    }

    addToUsersContainer(){
        this.usersContainer().addClient(this);
    }

    sendJsonObj(obj){
        this.sendMsg(JSON.stringify(obj));
    }

    sendMsg(msg){
        this._connection.sendUTF(msg);
    }

    sendErrorAndClose(actioncode,errcode){
        var error = {code:actioncode,result:errcode};
        this.sendMsg(JSON.stringify(error));
        this.close();
    }

    close(){
        this._connection.close();
    }

    messageRoute(message){
        let msgObj = schemaVaildate.validateToObj(schema,message);
        if(!msgObj){
            this.close();
            return;
        }

        if(msgObj.code !== 20000 && !this.aid){
            this.close();
            return;
        }

        let protocoObj = ChatFactory.make(msgObj.code);
        if(!protocoObj){
            this.close();
            return;
        }

        protocoObj.process(msgObj,this);
    }
}
module.exports = ChatClient;
