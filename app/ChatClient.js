"use strict";
const  schemaVaildate       = reqlib('/lib/helper/JsonSchemaValidation.js');
const  ChatFactory          = reqlib('/spec/chatprotocol/ChatFactory.js');
const  ChatUsersContainer   = reqlib('/app/ChatUsersContainer.js');
const  App                  = reqlib('/app/App.js');
const  ChatPRC              = reqlib('/app/channel/ChatPRC.js');
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
            App.getInstance().chatPRC.emit(ChatPRC.KEY_RosterOffLine,this);
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
        App.getInstance().chatPRC.emit(ChatPRC.KEY_RosterOnLine,this);
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

        let protocolObj = ChatFactory.make(msgObj.code);
        if(!protocolObj){
            this.close();
            return;
        }

        protocolObj.process(msgObj,this);
    }
}
module.exports = ChatClient;
