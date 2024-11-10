const express = require('express');
const cookieParser=require('cookie-parser')
const path=require('path')
const bcrypt=require('bcrypt')
const userModel=require('./models/user')
const jwt=require('jsonwebtoken')

const app = express();

app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.render('index');
})
app.post("/create",(req,res)=>{
const {username, email, password} = req.body;
if(!email.toString().includes('@gmail.com')){
   console.log("invalid email")
}
else{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt,async function(err, hash) {
                const createdUser= await userModel.create({username, email, password:hash}); 
                const token=jwt.sign({username}, "secret")  
                res.cookie("token",token)
                res.send(createdUser);
            });
        });
}
})

app.get('/logout',(req,res)=>{
    res.cookie("token","")
    res.redirect("/")

})
app.get("/login",(req,res)=>{
    res.render('login');
})
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const LoggedInUser = await userModel.findOne({ username });
    if (!LoggedInUser) return res.send("Something went wrong");

    bcrypt.compare(password, LoggedInUser.password, function (err, result) {
        if (err) return res.send("Error during comparison"); // Handle bcrypt error
        if (result) {
            const token=jwt.sign({username:LoggedInUser.username}, "secret")  
            res.cookie("token",token)
            return res.send('you can login'); // Send response and return
        } else {
            return res.send('no account found'); // Send response and return
        }
    });
    // Removed res.render('login'); to prevent multiple responses
});
app.listen(3001,()=>{
    console.log("listening at port 3001")
})