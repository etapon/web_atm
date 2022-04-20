import mongoose from 'mongoose';
import Complaint from "../models/complaint.model.js";
import Filter from 'bad-words'

const filter = new Filter()

import {ExtraBadWords} from './ExtraBadWords.js'
filter.addWords( ...ExtraBadWords)

export const getComplaints = async (req, res) => {
    try {
        const result = await Complaint.find().sort({createdAt: -1});
        res.json({success: true, result: result})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

export const getComplaintsForResident = async (req, res) => {
    const {id: id} = req.params;
    try {
        const result = await Complaint.find({residentId: id}).sort({createdAt: -1});
        res.json({success: true, result: result})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

export const createComplaint = async(req, res) => {
    
    try {
        const newComplaint = new Complaint({
            residentId: req.body.residentId,
            residentName: req.body.residentName,
            residentProfile: req.body.residentProfile,
            residentStreet: req.body.residentStreet,
            residentEmail: req.body.residentEmail,
            title: filter.clean(req.body.title),
            description: filter.clean(req.body.description)
        })
        await newComplaint.save()
        res.json({message: "Complaint Successfuly Created", result: newComplaint, success: true})
    } catch (error) {
        res.status.json({message: error.message, success: false})
    }
}

export const updateComplaint = async(req, res) => {
    const {id: _id} = req.params;
    const complaint = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.send({message:'no complaint with that id', success: false});
        const updatedComplaint = await Complaint.findByIdAndUpdate(_id, { 
            residentId: req.body.residentId,
            residentName: req.body.residentName,
            residentProfile: req.body.residentProfile,
            residentStreet: req.body.residentStreet,
            residentEmail: req.body.residentEmail,
            title: filter.clean(req.body.title),
            description: filter.clean(req.body.description), 
            _id}, {new: true});
        
        res.json({result: updatedComplaint, message: "Complaint Successfully Updated", success: true})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

export const deleteComplaint = async (req, res) => {
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.send({message:'no complaint with that id'});
        await Complaint.findByIdAndDelete(id);
        res.json({message: "Complaint Successfully Deleted", success: true})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

export const seenComplaint = async (req, res) => {
    const {id} = req.params;
    try {
        
        const existingUser = await Complaint.findOne({_id: req.params.id});
        console.log(existingUser)
        if(!existingUser) return res.json({message: "Complaint not found", success: false})

        await existingUser.updateOne({seen: true})

        res.json({message: "Complaint seen", result: existingUser, success: true})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}