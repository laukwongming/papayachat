const mongoose = reqlib('/config/db/connection.js').db;
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    nickname:  { type: String },
    aid:       { type: String, unique: true },
    pw:        { type: String },
    email:     { type: String, unique: true },
    company:   { type: String },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
  }
)
let User = mongoose.model('User', UserSchema)

exports.findByAidAndPwInDB = function(aid,pw,cb){
    User.findOne({ aid: aid, pw:pw}, function (err, doc){
        if(!cb) return;

        if(err || !doc){
            cb(null);
        }else{
            cb(doc);
        }
    });
}



// let u = new User({nickname:"hih1i",aid:"1",pw:"123",email:"1al22s2df@gmail.com"});
// u.save(function(err){
//     if(err)

//     console.log("insert suc sccc");
// });






