const express=require('express');
const app=express();

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/',(req,res)=>{
    // console.log("Hello")
    res.render('index')
});

app.listen(3002,()=>{
    console.log('listening at 3002')
})