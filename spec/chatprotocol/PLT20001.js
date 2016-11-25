/*
 * protocol 20001
 * @ state : 1 online , 2 offline
 *
 */

const ParserBase = reqlib('/spec/chatprotocol/ParserBase.js');
class PTL20001 extends ParserBase {
    schema(){
        return {
            "type": "object",
            "properties": {
                "code": {
                    "type": "integer"
                },
                "state": {
                    "type": "integer"
                }
            },
            "required": ["code","state"]
        };
    }

    process(msgObj,chatclient){
        super.process(msgObj,chatclient)

    }

}
module.exports = PTL20001;



