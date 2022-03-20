import mongoose from 'mongoose';
import Collection from '../models/collection.model.js';

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

export const getBiodegradableThisMonth = async (req, res) => {
    try {
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
                
        var finalFirstDate = formatDate(firstDay);
        var finalLastDate = formatDate(lastDay);
        
        const result = await Collection.aggregate(
            [
                {$match: { $and: [{"type": "Biodegradable"}, {"date": {$gte: finalFirstDate, $lte: finalLastDate}} ] }},
                {$group: {  _id: "$type", totalWeight: {$sum: "$weight"}}},
                {$sort: {totalWeight: -1}}
            ]
        )
        res.json({success: true, result: result})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

export const getNonBiodegradableThisMonth = async (req, res) => {
    try {
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
                
        var finalFirstDate = formatDate(firstDay);
        var finalLastDate = formatDate(lastDay);
        
        const result = await Collection.aggregate(
            [
                {$match: { $and: [{"type": "non-Biodegradable"}, {"date": {$gte: finalFirstDate, $lte: finalLastDate}} ] }},
                {$group: {  _id: "$type", totalWeight: {$sum: "$weight"}}},
                {$sort: {totalWeight: -1}}
            ]
        )
        res.json({success: true, result: result})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

export const getRecyclableThisMonth = async (req,res) => {
    try {
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
                
        var finalFirstDate = formatDate(firstDay);
        var finalLastDate = formatDate(lastDay);
        
        const result = await Collection.aggregate(
            [
                {$match: { $and: [{"type": "Recyclable"}, {"date": {$gte: finalFirstDate, $lte: finalLastDate}} ] }},
                {$group: {  _id: "$type", totalWeight: {$sum: "$weight"}}},
                {$sort: {totalWeight: -1}}
            ]
        )
        res.json({success: true, result: result})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

export const getBiodegradable = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();

        const firstDay = new Date(currentYear, 0, 1);

        const lastDay = new Date(currentYear, 11, 31);

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
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}


export const getNonBiodegradable = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();

        const firstDay = new Date(currentYear, 0, 1);

        const lastDay = new Date(currentYear, 11, 31);

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
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

export const getRecyclable = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();

        const firstDay = new Date(currentYear, 0, 1);

        const lastDay = new Date(currentYear, 11, 31);

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
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

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