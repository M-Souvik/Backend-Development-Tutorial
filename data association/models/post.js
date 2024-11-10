const mongoose = require('mongoose');


const  postSchema= mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    postdata: String,
    date: {
        type: Date,
        default:  Date.now
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
})

module.exports=mongoose.model("post",postSchema);