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
    constructor(con){
        this._connection        = con;
        this._isLogin           = false;
        this._roster            = [];
    }

    sendMsg(msg){
        this._connection.sendUTF(msg);
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

        let protocoObj = ChatFactory.make(msgObj.code);
        if(!protocoObj){
            this.close();
            return;
        }


        protocoObj.process(msgObj,this);
    }
}
module.exports = ChatClient;
