import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
export const questionSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    answerType: {
        type: String,
        required: true,
    }
})
