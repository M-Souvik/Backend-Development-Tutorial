import mongoose  from 'mongoose';
 mongoose.connect('mongodb+srv://Souvik:Zstar246@cluster0.pqchhcz.mongodb.net/user')

const UserSchema=mongoose.Schema({
    username: String,
    email: String,
    image: String,
})

export default mongoose.model("user",UserSchema);