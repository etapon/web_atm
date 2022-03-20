import mongoose from 'mongoose';
import Announcement from "../models/announcement.model.js";

export const getAnnouncements = async (req, res) => {
    const {page} = req.query;
    try {
        const LIMIT = 4;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await Announcement.countDocuments({});
        const announcements = await Announcement.find().limit(LIMIT).skip(startIndex).sort({createdAt: -1});

        res.json({ data: announcements, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({message: error.message, success: false});
    }
}

export const getPlainAnnouncements = async (req, res) => {
    const {page} = req.query;
    try{
        const announcements = await Announcement.find().sort({createdAt: -1});
        res.json({data: announcements, success: true})
    } catch(error) {
        res.status(404).json({message: error.message, success:false})
    }
}

export const createAnnouncement = async (req, res) => {
    const announcement = req.body;
    const newAnnouncement = new Announcement(announcement);
    try {
        await newAnnouncement.save()
        res.json({message: "Announcement Successfuly Created", result: newAnnouncement, success: true})
    } catch (error) {
        res.json({message: error.message, success: false});
        console.log(error);
    }
}

export const updateAnnouncement = async (req, res) => {
    const {id: _id } = req.params;
    const announcement = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.send({message:'no announcement with that id'});

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(_id, { ...announcement, _id}, {new: true});

    res.json({result: updatedAnnouncement, message:"Announcement Successfuly Updated"});
}

export const deleteAnnouncement = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.send({message:'no announcement with that id'});
    await Announcement.findByIdAndDelete(id);
    res.json({message: "Announcement successfully deleted"});
}

export const likeAnnouncement = async(req, res) => {
    const {id} = req.params;

    if(!req.userId) return res.json({message: 'Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no announcement with that id');
    const announcement = await Announcement.findById(id);

    const index = announcement.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        announcement.likes.push(req.userId);
    } else {
        announcement.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(id, announcement, {new: true})
    res.json(updatedAnnouncement);
}