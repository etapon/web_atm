import Collection from '../models/collection.model.js'
import {collections} from '../data/collections.js'

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

// app.use(bodyParser.json({limit: "30mb", extended: true}))
// app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
const PORT = 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(()=> app.listen(PORT, ()=> console.log(`Server running port: ${PORT}`)))
    .catch((error)=> console.log(error));

const deleteCollections = async () => {
    try {
        await Collection.deleteMany()
        
        console.log("data deleted")
        process.exit()

    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

const importCollections = async() => {
    try {
        await Collection.insertMany(collections)

        console.log("data imported")
        process.exit()

    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

switch(process.argv[2]){
    case '-d': {
        deleteCollections();
        break;
    }
    default : {
        importCollections();
    }
}