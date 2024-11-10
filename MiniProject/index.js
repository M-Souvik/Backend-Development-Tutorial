const express=require('express');
const app=express();
const path=require('path');
const  fs=require('fs');
const PORT=3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')))//Through this we can use html with css and js files along with images
app.set('view engine','ejs')

app.get('/',function(req,res){
    fs.readdir(`./files`,function (err, files) {
        res.render("index",{files: files});
        // i can send anything to the index.ejs
    })
})
app.get('/files/:filename',function(req,res){
   fs.readFile(`./files/${req.params.filename}`,"utf-8",function (err,filedata) {
   res.render('show',{filename:req.params.filename, filedata: filedata })
   })
})
app.get('/edit/:filename',function(req,res){
   res.render('edit',{filename: req.params.filename})
})

//dynamic routing
app.post('/create',function(req,res){
    console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
        res.redirect('/')
    })
})
app.post('/edit',function(req,res){
    console.log(req.body);
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
        res.redirect('/')
    })
})

app.listen(PORT,()=>{
    console.log(`Listening at ${PORT}`);
})
