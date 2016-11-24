var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const url = 'mongodb://127.0.0.1:27017/papayachat';
mongoose.connect(url);
//let Schema = mongooseDB.Schema

let UserSchema = new Schema(
  {
    name:      { type: String },
    login:     { type: String, unique: true },
    email:     { type: String, unique: true },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
  },
  {
    versionKey: false // You should be aware of the outcome after set to false
  }
)

let User = mongoose.model('User', UserSchema)

let u = new User({name:"hih1i",login:"tes12t",email:"1al22sdf@gmail.com"});
u.save(function(err){
    if(err)
        console.log(err);
});



