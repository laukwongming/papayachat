exports.validate = function(schema,jsonObj){
    var valid = ajv.validate(schema, jsonObj);
    if(!valid) return false;

    return true;
}

exports.validateToObj = function(schema,msg){
     try{
        var o = JSON.parse(msg);
        if (o && typeof o === "object") {
            var valid = ajv.validate(schema, o);
            if(!valid){
                return false;
            }
            return o;
        }
    }catch(err) {}
    return false;
}

