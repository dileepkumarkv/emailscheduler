const mongoose=require('mongoose')

const emailSchema= new mongoose.Schema({
    Subject:{
        type:String,
        required:true
        
    },
    Emailid:{
        type:String,
        required:true
    },
    Content:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true
    },
    ScheduleName:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('emailmodel',emailSchema)