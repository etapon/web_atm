import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        require: true
    },
    image: {
        type: String
    },
    password: {
        type: String, 
        require: true
    },
    street: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'resident'
    }
})

export default mongoose.model("user", userSchema)