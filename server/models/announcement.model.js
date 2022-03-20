import mongoose from 'mongoose';

const announcementSchema = mongoose.Schema({
    creator: String,
    title: String,
    message: String,
    street: String,
    selectedFile: {
        type: String
    },
    profile: {
        type: String
    },
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;