import mongoose from 'mongoose';
import moment from 'moment-timezone'

const datePhilippines = moment.tz(Date.now(), "Asia/Manila")

const complaintSchema = mongoose.Schema({
    residentId: {
        type: String,
        required: true
    },
    residentName: {
        type: String,
        required: true
    },
    residentProfile: String,
    residentStreet: String,
    title: String,
    description: String,
    comments: {
        senderId: String,
        sender: String,
        comment: String
    },
    createdAt: {
        type: Date,
        default: datePhilippines
    }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;