import mongoose from "mongoose";
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const learnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    password: {
        type: String,
        required: true,
        // unique: true
    }
})

// learnerSchema.methods.generateToken = () => {
//     return jsonwebtoken.sign({_id: this._id}, process.env.PRIVATE_KEY, {expiresIn: '3d'})
// }