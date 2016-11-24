"use strict";
const  schemaVaildate       = reqlib('/lib/helper/JsonSchemaValidation.js');
const  ChatFactory          = reqlib('/spec/chatprotocol/ChatFactory.js');
const  ChatUsersContainer   = reqlib('/app/ChatUsersContainer.js');

const schema =   {
    "type": "object",
    "properties": {
        "code": {
            "type": "integer"
        }
    },
    "required": ["code"]
};

class ChatClient{
    constructor(){
        this._isLogin           = false;
        this._roster            = [];
        this.username           = null;
    }

    usersContainer(){
        return ChatUsersContainer.getInstance();
    }

    bindConnection(con){
        this._connection        = con;
        this._connection.on('close', (reasonCode, description)=> {
            this.usersContainer().removeClient(this);
        });

        this._connection.on('message', (message)=> {
            if(message.type !== 'utf8'){
                    this.close();
                    return;
            }
            this.messageRoute(message.utf8Data);
        });
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

        if(msgObj.code !== 20000 && !this._isLogin){
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
