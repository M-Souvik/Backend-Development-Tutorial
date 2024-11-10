import express from'express'
import path from 'path'
import { fileURLToPath } from 'url';
import UserModel from './models/user.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>[
    res.render("app")
])

app.get('/read',async(req,res)=>{
    let AllUsers = await UserModel.find();
    // res.send(AllUsers);
    res.render("read", {users: AllUsers})
})

app.post('/create',async(req,res)=>{
    let {username, email, image} = req.body;
    let createdUser= await UserModel.create({
        username, // Added username
        email,    // Added email
        image  // Added imageurl
    })
    res.redirect("/read")
    console.log("created a user")
})
app.get('/delete/:id',async(req,res)=>{
    let DeleteUsers = await UserModel.findOneAndDelete({
        _id:req.params.id
    });
    res.redirect("/read")
})
app.get('/edit/:id',async(req,res)=>{
    let updatedUser = await UserModel.findOne({
        _id:req.params.id
    });
    res.render("edit",{user:updatedUser})
})
app.post('/update/:id',async(req,res)=>{
    let {username, email, image}=req.body;
    let updatedUser = await UserModel.findOneAndUpdate({_id:req.params.id},{username, email, image},{new: true});
    res.redirect("/")
})

app.listen(3000,()=>{
    console.log("Listening at 3000");
})