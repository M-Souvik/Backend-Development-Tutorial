const express = require('express');
const cookieParser=require('cookie-parser');
const bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');

const app=express();

app.use(cookieParser())//important for reading cookies

app.get("/",(req,res)=>{
    let token = jwt.sign({email: "souvik@gmail.com"},"secret")
    res.cookie("token",token);
    res.send("done")
    // bcrypt.compare("hello","$2b$10$EKzj3Z5FPz4JuB8E2G65l.TtksBskQaUTG56y/13uMW4nOhdu57By").then(function(result) {
    //     console.log(result)//for comparing the password given by user and the actual password stored in database
    // });
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("hello", salt, function(err, hash) {
    //        console.log(hash)//for encrypting the password
    //     });
    // });
})

//once cookie is set, there is no need to define cookie again
app.get("/read",(req,res)=>{
    console.log(req.cookies.token);
    res.send("read page");
})
app.listen(3001,()=>{
    console.log("listening at 3001")
});