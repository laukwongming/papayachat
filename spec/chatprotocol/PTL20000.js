const ParserBase = reqlib('/spec/chatprotocol/ParserBase.js');
const UserModel = reqlib('/app/model/User.js');
class PTL20000 extends ParserBase {
    schema(){
        return {
            "type": "object",
            "properties": {
                "code": {
                    "type": "integer"
                },
                "aid": {
                    "type": "string"
                },
                "pw": {
                    "type": "string"
                }
            },
            "required": ["code","aid","pw"]
        };
    }

    process(msgObj,chatclient){
        super.process(msgObj,chatclient)
        let user = chatclient.usersContainer().findByAid(msgObj.aid)
        if(user){
            chatclient.sendErrorAndClose(msgObj.code,PPYC_ERROR_CODE.LOGIN_DUPLICATE);
            return;
        }

        UserModel.findByAidAndPwInDB(msgObj.aid,msgObj.pw,(doc)=>{
            if(!doc){
                chatclient.sendErrorAndClose(msgObj.code,PPYC_ERROR_CODE.LOGIN_NO_USER);
                return;
            }

            //login successful
            chatclient.updateInfo(doc);
            chatclient.addToUsersContainer();

            let respone = {code:msgObj.code,result:1};
            chatclient.sendJsonObj(respone);
        });
    }
}
module.exports = PTL20000;



