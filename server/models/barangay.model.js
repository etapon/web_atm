import mongoose from 'mongoose';

const barangaySchema = mongoose.Schema({
    name: String,
    zone: String,
    district: String,
    lat: Number,
    long: Number
});

const Barangay = mongoose.model('Barangay', barangaySchema);

export default Barangay;