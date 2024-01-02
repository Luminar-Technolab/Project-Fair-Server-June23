const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:[3, 'Must be at least 3, got {VALUE}']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }
})

async function run() {
    await mongoose.connect(process.env.DATABASE);
      mongoose.model("users",userSchema)
    await mongoose.model('users').findOne(); // Works!
    return mongoose.model("users",userSchema)
  }

//  mongoose.model("users",userSchema)
const users = run()
module.exports = users