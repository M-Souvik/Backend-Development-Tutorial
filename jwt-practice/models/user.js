const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Souvik:Zstar246@cluster0.pqchhcz.mongodb.net/practice')

const userModel = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

module.exports= mongoose.model("practice",userModel);