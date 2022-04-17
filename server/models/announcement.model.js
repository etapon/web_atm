import mongoose from 'mongoose';
import moment from 'moment-timezone'

const datePhilippines = moment.tz(Date.now(), "Asia/Manila")

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
    createdAt: {
        type: Date,
        default: datePhilippines
    }
});

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;