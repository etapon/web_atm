import mongoose from 'mongoose';
import Sched from "../models/schedule.model.js";
import User from '../models/user.model.js';

export const getStreetSchedule = async (req, res) => {
    try {
        const schedule = await Sched.find({"queue": req.body.street})
        if(schedule == null){
            res.json({success: false, message: "no schedule for this street"})
        }
        res.json({success: true, result: schedule});
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAdminSchedules = async (req, res) => {
    try {
        const schedules = await Sched.find()
        res.json({success: true, result: schedules})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getSchedules = async (req, res) => {
    const {page} = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await Sched.countDocuments({});
        const schedules = await Sched.find().limit(LIMIT).skip(startIndex);

        res.json({ data: schedules, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getSchedule = async (req,res) => {
    const{id} = req.params;
    try{
        const sched = await Sched.findById(id);
        res.json({result: sched, success: true});
    } catch(error){
        res.status(404).json({message: error.message, success: false})
    }
}

export const createSchedule = async (req, res) => {
    try {
        
        const existingSchedule = await Sched.findOne({day: req.body.day});
        
        if(existingSchedule) return res.json({message: `schedule for ${req.body.day} is already existing`, success: false})

        if(hasDuplicates(req.body.queue)) return res.json({message: `there is a duplicate street in your queue, Please try again`, success: false})

        const selectedCollector = await User.findOne({_id: req.body.collector})
        console.log(req.body)
        const newSchedule = new Sched({
            day: req.body.day,
            collector: {
                refId: req.body.collector,
                name: selectedCollector.name
            },
            type: req.body.type,
            startOfCollection: req.body.startOfCollection,
            queue: req.body.queue
        })
        await newSchedule.save()

        res.json({result: newSchedule, message: "Schedule Successfuly Created", success:true})
    } catch (error) {
        res.json({message: "something wen't wrong", success:false, error:error.message});
    }
}

export const updateSchedule = async (req, res) => {
    const {id: _id} = req.params;
    console.log(req.params.id)
    try {
        const selectedCollector = await User.findOne({_id: req.body.collector})
        
        const newSchedule ={
            day: req.body.day,
            collector: {
                refId: req.body.collector,
                name: selectedCollector.name
            },
            type: req.body.type,
            startOfCollection: req.body.startOfCollection,
            queue: req.body.queue
        }
        console.log(newSchedule)

        const updatedSchedule = await Sched.findByIdAndUpdate(req.params.id, newSchedule)

        res.json({result: updatedSchedule, message: "Schedule Successfuly Updated", success: true})
    } catch (error) {
        res.json({message: "something wen't wrong", success:false, error: error.message});
    }
}


export const deleteSchedule = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No schedule found')
        const deleted = await Sched.findByIdAndDelete(id)
        res.json({message: 'Schedule succesfully deleted', success: true, deleted: deleted})
    } catch (error) {
        res.json({message: error.message, success:false});
    }
}


export const fetchCollectorSchedules = async (req,res) => {
    try {
        const {id} = req.params;
        const schedules = await Sched.find({"collector.refId": id})

        res.json({result: schedules, message: "Schedule Found", success:true})
    } catch (error) {
        console.log(error)
    }
}


export const fetchStreetOfDay = async (req,res) => {
    try {
        const {day} = req.params;
        res.json({message: `day is: ${day}`})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

export const getSchedulesBySearch = async (req, res) => {
    const {searchQuery} = req.query;
    try {

        if(searchQuery != 'none'){
            const schedules = await Sched.find({"queue": {$regex: searchQuery, $options: 'i'}})
            res.json({data: schedules})
        }

    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

export const getSchedToday = async (req, res) => {
    try {
        let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()]

        const schedule = await Sched.find({day: weekday})

        res.json({result: schedule, success: true})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

function hasDuplicates(array) {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (value in valuesSoFar) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}

