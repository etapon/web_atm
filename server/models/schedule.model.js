import mongoose from 'mongoose';

const schedSchema = mongoose.Schema({
    day: String,
    collector: {
        refId: String,
        name: String
    },
    type: String,
    startOfCollection: String,
    queue: [String]
    
});

const Sched = mongoose.model('Sched', schedSchema);

export default Sched;