import mongoose from 'mongoose';
import Complaint from "../models/complaint.model.js";


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
    const complaint = req.body;
    try {
        const newComplaint = new Complaint(complaint)
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
        const updatedComplaint = await Complaint.findByIdAndUpdate(_id, { ...complaint, _id}, {new: true});
        
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
