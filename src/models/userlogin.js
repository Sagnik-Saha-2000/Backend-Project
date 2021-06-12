const mongoose = require("mongoose");
const validator=require("validator")
const bcrypt=require("bcryptjs")
const regSchema= new mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
    email:{
        type: String,
        required : true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email id")
            }
        }
    },
    password:{
         type:String,
         required:true
    },
    confirmpassword:{
        type:String,
        required:true
   },
    
    date:{
        type:Date,
        default:Date.now
    }
})
   
regSchema.pre("save",async function(next){
    if(this.isModified("password")){

    this.password = await bcrypt.hash(this.password,10);
    this.confirmpassword=undefined;
    }
    next();
})
const Reg = new mongoose.model("Reg",regSchema);

module.exports = Reg ;

