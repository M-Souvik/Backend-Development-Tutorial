const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://Souvik:Zstar246@cluster0.pqchhcz.mongodb.net/practice-2')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profile: {
        type: String,
        default: "user.png"
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
})

module.exports=mongoose.model("user", userSchema)