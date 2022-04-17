import mongoose from 'mongoose'
import userModel from './user.model.js';
const tokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: userModel,
        unique: true
    },
    token: {type: String, required: true},
    createdAt: {type: Date, dafault: Date.now(), expires: 3600}
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;