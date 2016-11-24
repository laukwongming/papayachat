const schemaVaildate = reqlib('/lib/helper/JsonSchemaValidation.js');

class ParserBase {
    schema(){
        return {};
    }

    process(msgObj,chatclient){
        if(!schemaVaildate.validate(schema(),msgObj)){
            chatclient.close();
            return;
        }
    }
}

module.exports = ParserBase;
