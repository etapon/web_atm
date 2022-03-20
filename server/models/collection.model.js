import mongoose from 'mongoose';

const collectionSchema = mongoose.Schema({
    street: String,
    type: String,
    weight: Number,
    date: String
});

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;