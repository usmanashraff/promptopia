import mongoose, {model, models, Schema} from 'mongoose'


const UserSchema = new Schema({

    username: {
        type: String,
        unique: [true, 'username should be unique'],
        required: [true, 'username is required'],
        match: [/^\w{8,20}$/, 'username should only contain 8 to 20 alphanumeric letters and should be unique']
    },
    email:{
        type: String,
        unique: [true, 'email should be unique'],
        required: [true, 'email is required']
    },
    image: {
        type: String
    }
})

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
