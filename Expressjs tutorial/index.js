const express=require('express');
const app =express();

app.use(express.json());//for json
app.use(express.urlencoded({extended: true}));//for urlencoded 
//making the blob(basically a unreadable text format) readable to the server

//Middleware
app.use(function (req,res,next) {
    console.log('MiddleWare has started');
    next();
});

//Routes
app.get('/about',(req,res)=>{
    res.send('About page');
})

app.get('/profile',(req,res,next)=>{
    return next(new Error("something went wrong"))
})

//Error handling 
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  }) 

app.listen(3002);

