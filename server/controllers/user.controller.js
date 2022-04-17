import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import Token from '../models/token.model.js'
import {sendEmail} from '../utils/sendEmail.js'

import {sendMail} from './sendMail.js';
import { defaultProfile } from './defaultResources.js';

export const getUserCount = async (req, res) => {
    try {

        const userCount = await User.count()
        res.json({sucess: true, result: userCount})

    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

export const getUserStreets = async (req, res) => {
    try {
        const result = await User.aggregate(
            [
                {$match: { }},
                {$group: {  _id: "$street", totalUser: {$count: {}}}},
                {$sort: {_id: -1}}
            ]
        )
        res.json({success: true, result: result})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

export const getResidentCount = async (req, res) => {
    try {
        const userCount = await User.count({role: "resident"})
        res.json({sucess: true, result: userCount})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getCollectors = async (req, res) => {
    try{
        const users = await User.find({role: "collector"})
        res.status(200).json(users)
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const signin = async (req,res) => {
    const {email, password} = req.body;
    
    try {
        const trimmedEmail = email.trim();
        
        const isVerified = await User.findOne({email: trimmedEmail, verified: true});

        const existingUser = await User.findOne({email: trimmedEmail});
        
        

        if(!isVerified){
            
            let findToken = await Token.findOne({userId: existingUser._id})
            if(!findToken){
                console.log("hindi to verified")
                const token = jwt.sign({email: trimmedEmail, id: existingUser._id}, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '1d'});
                
                const newToken = await Token.create({
                    userId: existingUser._id,
                    token: token
                })
                const url = `${process.env.BASE_URL}/user/${existingUser._id}/verify/${token}`

                await sendEmail(email, "Verify Email", url)
                return res.json({message: "please check your email", success: false})
            }
            return res.json({message: "user not verified, please check your email", success: false})
        }

        
        
        if(!existingUser){
            return res.json({message: "User doesn't exist.", success: false});
        } 
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.json({message: "Invalid credentials", success: false});

        const token = jwt.sign({email: trimmedEmail, id: existingUser._id}, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '1d'});
        res.json({result: existingUser, token, success: true, message: "Successfuly Logged In"});

    } catch (error) {
        res.json({message: "Something wen't wrong", success: false})
    }
}

export const signup = async (req,res) => {
    const {firstName, lastName, email, street, password, confirmPassword} = req.body;
    
    try{
        const existingUser = await User.findOne({email});
        
        if(existingUser) return res.json({message: "user already exists", success: false})
        
        if(firstName == null || lastName == null) return res.status(400).json({message: "please check your credentials", success: false})
        
        if(!validateEmail(email)) return res.json({message: "invalid email", success: false})
        
        if(street == null) return res.json({message:"please select your street", success: false})
        
        if(password.length < 8) return res.json({message: "password must contain atleast 8 characters", success: false})
        
        if(password != confirmPassword) return res.json({message: "Password did not match", success: false});
        
        const hashedPassword = await bcrypt.hash(password, 12);
       
        const result = await User.create({email: email.trim(), password: hashedPassword, street: street, name: `${req.body.firstName} ${req.body.lastName}`, image: defaultProfile});
        
        const token = jwt.sign( { email: result.email, id: result._id }, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: "1d" } );
        
        const newToken = await Token.create({
            userId: result._id,
            token: token
        })

        const url = `${process.env.BASE_URL}/user/${result._id}/verify/${token}`

        await sendEmail(result.email, "Verify Email", url)

        res.json({message:"An Email sent to your account please verify", success: true, result: result, token: token})
        
        
        // const token = jwt.sign({email, password: hashedPassword, street: street, name: `${firstName} ${lastName}`}, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '1h'});

        

        // const url = `${process.env.CLIENT_URL}/activate/${token}`

        // sendMail(email, url)

        // res.json({message: "your one step closer! please check your email and activate your account", success: true});
    } catch (error) {
        res.json({message: error.message, success: false});
    }
}

export const verifyUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({_id: req.params.id});
        if(!existingUser) return res.json({message: "Invalid Link", success: false})

        const token = await Token.findOne({userId: existingUser._id, token: req.params.token})
        if(!token) return res.json({message: "Invalid Link", success: false})

        await existingUser.updateOne({verified: true})
        await token.remove()
        res.json({message: "Email successfuly verified", success: true})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

// export const activation = async (req,res) => {
//     const {token} = req.params
//     try{
//         const user = jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET)
//         const userEmail = user.email
//         // const existingUser = await User.findOne({userEmail});
//         // if(existingUser) return res.json({message: "user already exists", success: false})

//         console.log(user.email)
//         const result = await User.create({email: user.email, password: user.password, barangay: user.barangay, name: user.name});
//         res.json({result: result, token, success: true, message: "Welcome to E-tapon Mo! we encourage you to go to your profile and add your photo"});
//     } catch (error) {
//         res.json({message: "Something wen't wrong"});
//     }
// }

export const updateUser = async (req, res) => {
    try {
        const updateUser = await User.findOneAndUpdate({
            "_id": req.body._id
        }, {
            "$set": {
                "name": req.body.name,
                "email": req.body.email,
                "street": req.body.street,
                "role": req.body.role
            }
        }, {new:true})
        return res.status(200).json({result: updateUser, message: "user successfully modified", success: true});
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}



export const deleteUser = async (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body._id)) return res.status(404).send('No user found')
        await User.findByIdAndRemove(req.body._id);
        res.json({message: 'User succesfully deleted', success: true})
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}

export const updateImage = async (req, res) => {
    
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body._id)) return res.json({message: "User not found", success:false})
        
        const setImage = await User.findOneAndUpdate({
            "_id": req.body._id
        }, {
            "$set": {
                "image": req.body.image
            }
        })
        res.json({result: setImage, message:"Done changing account Image", success:true})
    } catch (error) {
        res.json({message: "invalid file, updating image FAILED", success:false})
    }
}

export const updateCredentials = async (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.body._id)) return res.json({message: "User not found", success:false})
        const setCredentials = await User.findOneAndUpdate({
            "_id": req.body._id
        }, {
            "$set": {
                "name": req.body.name,
                "street": req.body.street
            }
        })
        res.json({result: setCredentials, message:"Please re - LogIn to see changes", success:true})
    } catch (error) {
        return res.json({success: false, message: 'update failed'})
    }
}

export const changePassword = async (req, res) => {
    try {
        console.log(req.body)
        const existingUser = await User.findOne({_id: req.body._id});
        
        if(!existingUser) return res.json({message: "User doesn't exist.", success: false});

        const isOldPasswordCorrect = await bcrypt.compare(req.body.oldPassword, existingUser.password)

        if(!isOldPasswordCorrect) return res.json({message: "Old Password is incorrect", success: false})

        if(req.body.newPassword != req.body.confirmNewPassword) return res.json({message: "Your new Password did not match", success: false})

        if(req.body.newPassword.length < 8) return res.json({message: "password must contain atleast 8 characters", success: false})

        const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);

        const setPassword = await User.findOneAndUpdate({
            "_id": req.body._id
        }, {
            "$set": {
                "password": hashedPassword
            }
        })
        return res.json({success: true, message: "Password Successfuly Changed", result: setPassword})
    } catch (error) {
        return res.json({success: false, message: 'failed changing password'})
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
