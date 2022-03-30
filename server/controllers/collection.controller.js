import mongoose from 'mongoose';
import Collection from '../models/collection.model.js';


// ==================================== ANALYTICS FOR TOTAL ====================================
export const getCollectedToday = async (req, res) => {
    try {
        var date = new Date()
        var today = formatDate(date);
        const result = await Collection.aggregate(
            [
                {$match: { "date": today }},
                {$group: {  _id: "$date", totalWeight: {$sum: "$weight"}}},
                {$sort: {totalWeight: -1}}
            ]
        )
        if(result[0] === undefined){
            res.json({result: 0})
        }else{
            res.json({result: result[0].totalWeight})
        }
        

    } catch (error) {
        res.json({message: error.message, success: false})
    }
}
export const getCollectedThisMonth = async (req, res) => {
    try {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        var finalFirstDate = formatDate(firstDay)
        var finalLastDate = formatDate(lastDay)

        const result = await Collection.aggregate(
            [
                {$match: { "date": {$gte: finalFirstDate, $lte: finalLastDate} }},
                {$group: { _id: 'a',  totalWeight: {$sum: "$weight"}}},
                {$sort: {totalWeight: -1}}
            ]
        )
        if(result[0] === undefined){
            res.json({result: 0})
        }else{
            res.json({result: result[0].totalWeight})
        }

    } catch (error) {
        res.json({success: false, message:error.message})
    }
}
export const getCollectedThisYear = async (req, res) => {
    var currentDate = new Date();

            var firstDay = new Date(currentDate.getFullYear(), 0, 1);
            var lastDay = new Date(currentDate.getFullYear(), 11, 31);
            
            var finalFirstDate = formatDate(firstDay);
            var finalLastDate = formatDate(lastDay);

            const result = await Collection.aggregate(
                [
                    {$match: { "date": {$gte: finalFirstDate, $lte: finalLastDate} }},
                    {$group: {  _id: "a", totalWeight: {$sum: "$weight"}}},
                    {$sort: {totalWeight: -1}}
                ]
            )
            if(result[0] === undefined){
                res.json({result: 0})
            }else{
                res.json({result: result[0].totalWeight})
            }
}
export const getCollectedSorted= async(req, res) => {
    try {
        const result = await Collection.aggregate(
            [
                {$match: {}},
                {$group: {  _id: "$date", totalWeight: {$sum: "$weight"}}},
                {$sort: {_id: 1}}
            ]
        )
        res.json({success: true, result: result})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
export const getCollectedWasteType = async(req, res) => {
    const filter = req.body.filter
    console.log(filter)
    try {
        if(filter == "month"){

            var date = new Date(), y = date.getFullYear(), m = date.getMonth();
            var firstDay = new Date(y, m, 1);
            var lastDay = new Date(y, m + 1, 0);
                    
            var finalFirstDate = formatDate(firstDay);
            var finalLastDate = formatDate(lastDay);
        
            const result = await Collection.aggregate(
                [
                    {$match: { "date": {$gte: finalFirstDate, $lte: finalLastDate} }},
                    {$group: {  _id: "$type", totalWeight: {$sum: "$weight"}}},
                    {$sort: {_id: -1}}
                ]
            )
            res.json({success: true, result: result})

        }else if(filter == "year"){
            var currentDate = new Date();

            var firstDay = new Date(currentDate.getFullYear(), 0, 1);
            var lastDay = new Date(currentDate.getFullYear(), 11, 31);
            
            var finalFirstDate = formatDate(firstDay);
            var finalLastDate = formatDate(lastDay);

            const result = await Collection.aggregate(
                [
                    {$match: { "date": {$gte: finalFirstDate, $lte: finalLastDate} }},
                    {$group: {  _id: "$type", totalWeight: {$sum: "$weight"}}},
                    {$sort: {_id: -1}}
                ]
            )
            res.json({success: true, result: result})
        }else{
            const result = await Collection.aggregate(
                [
                    {$match: { }},
                    {$group: {  _id: "$type", totalWeight: {$sum: "$weight"}}},
                    {$sort: {_id: -1}}
                ]
            )
            res.json({success: true, result: result})
        }
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}
// ==================================== ANALYTICS FOR TOTAL ====================================




export const getCollections = async (req, res) => {
    try {
        const collections = await Collection.find();
        res.json({success: true, result: collections})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

export const createCollection = async (req, res) => {
    console.log("hi")
    try {
        const collection = req.body;
        const convertedWeight = parseInt(collection.weight);

        const newCollection = new Collection({
            street: collection.street,
            type: collection.type,
            date: collection.date,
            weight: convertedWeight
        })

        await newCollection.save()
        res.json({message: "collection Successfuly saved", result: newCollection, success: true})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}





// ==================================== DASHBOARD ====================================
export const getNonBiodegradablesToday = async (req, res) => {
    try {
        var date = new Date()
        var today = formatDate(date);
        const result = await Collection.aggregate(
            [
                {$match: { $and: [{"type": "non-Biodegradable"}, {"date": today} ] }},
                {$group: {  _id: "$type", totalWeight: {$sum: "$weight"}}},
                {$sort: {totalWeight: -1}}
            ]
        )
        if(result[0] === undefined){
            res.json({result: 0})
        }else{
            res.json({result: result[0].totalWeight})
        }
        

    } catch (error) {
        res.json({message: error.message, success: false})
    }
}
export const getRecyclablesToday = async (req, res) => {
    try {
        var date = new Date()
        var today = formatDate(date);
        const result = await Collection.aggregate(
            [
                {$match: { $and: [{"type": "Recyclable"}, {"date": today} ] }},
                {$group: {  _id: "$type", totalWeight: {$sum: "$weight"}}},
                {$sort: {totalWeight: -1}}
            ]
        )
        if(result[0] === undefined){
            res.json({result: 0})
        }else{
            res.json({result: result[0].totalWeight})
        }
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}
export const getBiodegradablesToday = async (req, res) => {
    try {
        var date = new Date()
        var today = formatDate(date);
        const result = await Collection.aggregate(
            [
                {$match: { $and: [{"type": "Biodegradable"}, {"date": today} ] }},
                {$group: {  _id: "$type", totalWeight: {$sum: "$weight"}}},
                {$sort: {totalWeight: -1}}
            ]
        )
        if(result[0] === undefined){
            res.json({result: 0})
        }else{
            res.json({result: result[0].totalWeight})
        }

    } catch (error) {
        res.json({message: error.message, success: false})
    }
}
export const getTotalPerStreetToday = async (req, res) => {
    try {
        var date = new Date()
        var today = formatDate(date);

        const result = await Collection.aggregate(
            [
                {$match: {"date": today }},
                {$group: {  _id: "$street", totalWeight: {$sum: "$weight"}}},
                {$sort: {_id: -1}}
            ]
        )
        res.json({success: true, result: result})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
// ==================================== DASHBOARD ====================================





// ==================================== ANALYTICS FOR BIODEGRADABLE ====================================
export const getBiodegradableThisMonth = async (req, res) => {
    try {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        var finalFirstDate = formatDate(firstDay)
        var finalLastDate = formatDate(lastDay)

        const result = await Collection.aggregate(
            [
                {$match: { $and: [{"type": "Biodegradable"}, {"date": {$gte: finalFirstDate, $lte: finalLastDate}} ] }},
                {$group: {  _id: "$type", totalWeight: {$sum: "$weight"}}},
                {$sort: {totalWeight: -1}}
            ]
        )
        if(result[0] === undefined){
            res.json({result: 0})
        }else{
            res.json({result: result[0].totalWeight})
        }

    } catch (error) {
        res.json({success: false, message:error.message})
    }
}
export const getBiodegradablesThisYear = async (req, res) => {
    var currentDate = new Date();

            var firstDay = new Date(currentDate.getFullYear(), 0, 1);
            var lastDay = new Date(currentDate.getFullYear(), 11, 31);
            
            var finalFirstDate = formatDate(firstDay);
            var finalLastDate = formatDate(lastDay);

            const result = await Collection.aggregate(
                [
                    {$match: { $and: [{"type": "Biodegradable"}, {"date": {$gte: finalFirstDate, $lte: finalLastDate}} ] }},
                    {$group: {  _id: "$type", totalWeight: {$sum: "$weight"}}},
                    {$sort: {totalWeight: -1}}
                ]
            )
            if(result[0] === undefined){
                res.json({result: 0})
            }else{
                res.json({result: result[0].totalWeight})
            }
}
export const getBiodegradableDynamic = async (req, res) => {
    const filter = req.body.filter
    console.log(filter)
    try {
        if(filter == "month"){

            var date = new Date(), y = date.getFullYear(), m = date.getMonth();
            var firstDay = new Date(y, m, 1);
            var lastDay = new Date(y, m + 1, 0);
                    
            var finalFirstDate = formatDate(firstDay);
            var finalLastDate = formatDate(lastDay);
        
            const result = await Collection.aggregate(
                [
                    {$match: { $and: [{"type": "Biodegradable"}, {"date": {$gte: finalFirstDate, $lte: finalLastDate}} ] }},
                    {$group: {  _id: "$street", totalWeight: {$sum: "$weight"}}},
                    {$sort: {totalWeight: -1}}
                ]
            )
            res.json({success: true, result: result})

        }else if(filter == "year"){
            var currentDate = new Date();

            var firstDay = new Date(currentDate.getFullYear(), 0, 1);
            var lastDay = new Date(currentDate.getFullYear(), 11, 31);
            
            var finalFirstDate = formatDate(firstDay);
            var finalLastDate = formatDate(lastDay);

            const result = await Collection.aggregate(
                [
                    {$match: { $and: [{"type": "Biodegradable"}, {"date": {$gte: finalFirstDate, $lte: finalLastDate}} ] }},
                    {$group: {  _id: "$street", totalWeight: {$sum: "$weight"}}},
                    {$sort: {totalWeight: -1}}
                ]
            )
            res.json({success: true, result: result})
        }else{
            const result = await Collection.aggregate(
                [
                    {$match: { "type": "Biodegradable" }},
                    {$group: {  _id: "$street", totalWeight: {$sum: "$weight"}}},
                    {$sort: {totalWeight: -1}}
                ]
            )
            res.json({success: true, result: result})
        }
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}
export const getBiodegradableSorted= async(req, res) => {
    try {
        const result = await Collection.aggregate(
            [
                {$match: { "type": "Biodegradable" }},
                {$group: {  _id: "$date", totalWeight: {$sum: "$weight"}}},
                {$sort: {_id: 1}}
            ]
        )
        res.json({success: true, result: result})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
// ==================================== ANALYTICS FOR BIODEGRADABLE ====================================




// ==================================== ANALYTICS FOR NON-BIODEGRADABLE ====================================
export const getNonBiodegradableThisMonth = async (req, res) => {
    try {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        var finalFirstDate = formatDate(firstDay)
        var finalLastDate = formatDate(lastDay)

        const result = await Collection.aggregate(
            [
                {$match: { $and: [{"type": "non-Biodegradable"}, {"date": {$gte: finalFirstDate, $lte: finalLastDate}} ] }},
                {$group: {  _id: "$type", totalWeight: {$sum: "$weight"}}},
                {$sort: {totalWeight: -1}}
            ]
        )
        if(result[0] === undefined){
            res.json({result: 0})
        }else{
            res.json({result: result[0].totalWeight})
        }

    } catch (error) {
        res.json({success: false, message:error.message})
    }
}
export const getNonBiodegradablesThisYear = async (req, res) => {
    var currentDate = new Date();

            var firstDay = new Date(currentDate.getFullYear(), 0, 1);
            var lastDay = new Date(currentDate.getFullYear(), 11, 31);
            
            var finalFirstDate = formatDate(firstDay);
            var finalLastDate = formatDate(lastDay);

            const result = await Collection.aggregate(
                [
                    {$match: { $and: [{"type": "non-Biodegradable"}, {"date": {$gte: finalFirstDate, $lte: finalLastDate}} ] }},
                    {$group: {  _id: "$type", totalWeight: {$sum: "$weight"}}},
                    {$sort: {totalWeight: -1}}
                ]
            )
            if(result[0] === undefined){
                res.json({result: 0})
            }else{
                res.json({result: result[0].totalWeight})
            }
}
export const getNonBiodegradableDynamic = async (req, res) => {
    const filter = req.body.filter
    console.log(filter)
    try {
        if(filter == "month"){

            var date = new Date(), y = date.getFullYear(), m = date.getMonth();
            var firstDay = new Date(y, m, 1);
            var lastDay = new Date(y, m + 1, 0);
                    
            var finalFirstDate = formatDate(firstDay);
            var finalLastDate = formatDate(lastDay);
        
            const result = await Collection.aggregate(
                [
                    {$match: { $and: [{"type": "non-Biodegradable"}, {"date": {$gte: finalFirstDate, $lte: finalLastDate}} ] }},
                    {$group: {  _id: "$street", totalWeight: {$sum: "$weight"}}},
                    {$sort: {totalWeight: -1}}
                ]
            )
            res.json({success: true, result: result})

        }else if(filter == "year"){
            var currentDate = new Date();

            var firstDay = new Date(currentDate.getFullYear(), 0, 1);
            var lastDay = new Date(currentDate.getFullYear(), 11, 31);
            
            var finalFirstDate = formatDate(firstDay);
            var finalLastDate = formatDate(lastDay);

            const result = await Collection.aggregate(
                [
                    {$match: { $and: [{"type": "non-Biodegradable"}, {"date": {$gte: finalFirstDate, $lte: finalLastDate}} ] }},
                    {$group: {  _id: "$street", totalWeight: {$sum: "$weight"}}},
                    {$sort: {totalWeight: -1}}
                ]
            )
            res.json({success: true, result: result})
        }else{
            const result = await Collection.aggregate(
                [
                    {$match: { "type": "non-Biodegradable" }},
                    {$group: {  _id: "$street", totalWeight: {$sum: "$weight"}}},
                    {$sort: {totalWeight: -1}}
                ]
            )
            res.json({success: true, result: result})
        }
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}
export const getNonBiodegradableSorted= async(req, res) => {
    try {
        const result = await Collection.aggregate(
            [
                {$match: { "type": "non-Biodegradable" }},
                {$group: {  _id: "$date", totalWeight: {$sum: "$weight"}}},
                {$sort: {_id: 1}}
            ]
        )
        res.json({success: true, result: result})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
// ==================================== ANALYTICS FOR NON-BIODEGRADABLE ====================================



// ==================================== ANALYTICS FOR RECYCLABLES ====================================
export const getRecyclablesThisMonth = async (req, res) => {
    try {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        var finalFirstDate = formatDate(firstDay)
        var finalLastDate = formatDate(lastDay)

        const result = await Collection.aggregate(
            [
                {$match: { $and: [{"type": "Recyclable"}, {"date": {$gte: finalFirstDate, $lte: finalLastDate}} ] }},
                {$group: {  _id: "$type", totalWeight: {$sum: "$weight"}}},
                {$sort: {totalWeight: -1}}
            ]
        )
        if(result[0] === undefined){
            res.json({result: 0})
        }else{
            res.json({result: result[0].totalWeight})
        }

    } catch (error) {
        res.json({success: false, message:error.message})
    }
}
export const getRecyclablesThisYear = async (req, res) => {
    var currentDate = new Date();

            var firstDay = new Date(currentDate.getFullYear(), 0, 1);
            var lastDay = new Date(currentDate.getFullYear(), 11, 31);
            
            var finalFirstDate = formatDate(firstDay);
            var finalLastDate = formatDate(lastDay);

            const result = await Collection.aggregate(
                [
                    {$match: { $and: [{"type": "Recyclable"}, {"date": {$gte: finalFirstDate, $lte: finalLastDate}} ] }},
                    {$group: {  _id: "$type", totalWeight: {$sum: "$weight"}}},
                    {$sort: {totalWeight: -1}}
                ]
            )
            if(result[0] === undefined){
                res.json({result: 0})
            }else{
                res.json({result: result[0].totalWeight})
            }
}
export const getRecyclableDynamic = async (req, res) => {
    const filter = req.body.filter
    console.log(filter)
    try {
        if(filter == "month"){

            var date = new Date(), y = date.getFullYear(), m = date.getMonth();
            var firstDay = new Date(y, m, 1);
            var lastDay = new Date(y, m + 1, 0);
                    
            var finalFirstDate = formatDate(firstDay);
            var finalLastDate = formatDate(lastDay);
        
            const result = await Collection.aggregate(
                [
                    {$match: { $and: [{"type": "Recyclable"}, {"date": {$gte: finalFirstDate, $lte: finalLastDate}} ] }},
                    {$group: {  _id: "$street", totalWeight: {$sum: "$weight"}}},
                    {$sort: {totalWeight: -1}}
                ]
            )
            res.json({success: true, result: result})

        }else if(filter == "year"){
            var currentDate = new Date();

            var firstDay = new Date(currentDate.getFullYear(), 0, 1);
            var lastDay = new Date(currentDate.getFullYear(), 11, 31);
            
            var finalFirstDate = formatDate(firstDay);
            var finalLastDate = formatDate(lastDay);

            const result = await Collection.aggregate(
                [
                    {$match: { $and: [{"type": "Recyclable"}, {"date": {$gte: finalFirstDate, $lte: finalLastDate}} ] }},
                    {$group: {  _id: "$street", totalWeight: {$sum: "$weight"}}},
                    {$sort: {totalWeight: -1}}
                ]
            )
            res.json({success: true, result: result})
        }else{
            const result = await Collection.aggregate(
                [
                    {$match: { "type": "Recyclable" }},
                    {$group: {  _id: "$street", totalWeight: {$sum: "$weight"}}},
                    {$sort: {totalWeight: -1}}
                ]
            )
            res.json({success: true, result: result})
        }
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}
export const getRecyclableSorted= async(req, res) => {
    try {
        const result = await Collection.aggregate(
            [
                {$match: { "type": "Recyclable" }},
                {$group: {  _id: "$date", totalWeight: {$sum: "$weight"}}},
                {$sort: {_id: 1}}
            ]
        )
        res.json({success: true, result: result})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
// ==================================== ANALYTICS FOR RECYCLABLES ====================================


// ==================================== FUNCTIONS ====================================
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate())
    ].join('-');
}
// ==================================== FUNCTIONS ====================================