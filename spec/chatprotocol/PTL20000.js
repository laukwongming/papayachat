const ParserBase = reqlib('/spec/chatprotocol/ParserBase.js');

class PTL20000 extends ParserBase {
    schema(){
        return {
            "type": "object",
            "properties": {
                "code": {
                    "type": "integer"
                },
                "username": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                }
            },
            "required": ["code"]
        };
    }

    process(msgObj,chatclient){
        super.process(msgObj,chatclient);
        let user = chatclient.usersContainer().findByUsername(msgObj.username)
        if(user){
            chatclient.sendErrorAndClose(msgObj.code,PPYC_ERROR_CODE.LOGIN_DUPLICATE);
            return;
        }
    }
}
module.exports = PTL20000;



