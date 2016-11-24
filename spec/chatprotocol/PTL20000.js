const ParserBase = reqlib('/spec/chatprotocol/ParserBase.js')

class PTL20000 extends ParserBase{
    schema(){
        return {
            "type": "object",
            "properties": {
                "code": {
                    "type": "integer"
                }
            },
            "required": ["code"]
        };
    }

    process(msgObj,chatclient){
        super.process(msgObj,chatclient);
    }

}
