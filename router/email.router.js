const express=require('express')
const router=express.Router()
const emails=require('../models/email.model')
const schedule = require('node-schedule');
const userObj = {};
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testemailscheduler21@gmail.com',
    pass: 'email123#'
  }
});

//Create Email
router.post('/',async(req,res)=>{

    let emailObj = await emails.find({ScheduleName:req.body.schedulename,Date:{$gt:new Date()}});
    if(emailObj.length>0){
        res.send("Schedule Name already exists");
    }
    else{
    if(new Date(req.body.date)>new Date() && validateEmail(req.body.email)){
    const abc= new emails({
        Emailid:req.body.email,
        Subject:req.body.subject,
        Content:req.body.content,
        Date:req.body.date,
        ScheduleName:req.body.schedulename
    })
    try {
        const save=await abc.save();

        userObj[req.body.schedulename] = schedule.scheduleJob(new Date(req.body.date), function(){
            console.log('The world is going to end today.');
            var mailOptions = {
                from: 'vivek.aroli@gmail.com',
                to: req.body.email,
                subject: req.body.subject,
                text: req.body.content
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  delete userObj[req.body.schedulename];
                } else {
                  console.log('Email sent: ' + info.response);
                  delete userObj[req.body.schedulename];
                }
              });
          });
        res.json(save)
        
    } catch (error) {
        res.send(error)
        
    }
}
else{
    res.send("Scheduled Time is already Passed or email is not valid")
}
}
})

//Read a Email
router.get('/:id',async(req,res)=>{
    try {
        const xyz= await emails.findById(req.params.id)
        res.json(xyz)
    } catch (error) {
        res.send('error',error)
        
    }
 
 })

 //List an Email
 router.get('/',async(req,res)=>{
    try {
        const listemail= await emails.find()
        res.json(listemail)
    } catch (error) {
        res.send('error',error)
        
    }
 
 })

 //Update An email
 router.patch('/:id',async(req,res)=>{
    try {
        const update=await emails.findById(req.params.id)
        if(req.body.content){
            update.Content=req.body.content
        }
        if(req.body.subject){
            update.Subject=req.body.subject
        }
        if(req.body.email){
            update.Emailid=req.body.email
        }
        if(req.body.date){
            update.Date=req.body.date
        }
        if(new Date(req.body.date)>new Date()){
        const updateandsave= await update.save()

        userObj[updateandsave.ScheduleName].cancel();
        userObj[updateandsave.schedulename] = schedule.scheduleJob(new Date(updateandsave.date), function(){
            console.log('The world is going to end this time.');
            var mailOptions = {
                from: 'vivek.aroli@gmail.com',
                to: req.body.email,
                subject: req.body.subject,
                text: req.body.content
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  delete userObj[req.body.schedulename];
                } else {
                  console.log('Email sent: ' + info.response);
                  delete userObj[req.body.schedulename];
                }
              });
          });

        res.json('updated' + updateandsave)
        }
        else{
            res.send("Scheduled Time is already Passed")
        }
        
   } catch (error) {
        res.send(error)
        
    }
})

//Delete an email
router.delete('/:id',async(req,res)=>{
    try {
        const deleteemail=await emails.deleteOne({"_id":req.params.id})
        res.send(deleteemail)
    } catch (error) {
        res.send(error)
        
    }
})

function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
module.exports=router