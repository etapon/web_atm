import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Barangay from '../models/barangay.model.js';
import mongoose from 'mongoose';

export const getBarangays = async (req, res) => {
    try {
        const barangays = await Barangay.find();
        res.status(200).json(barangays)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
