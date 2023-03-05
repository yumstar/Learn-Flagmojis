import mongoose from 'mongoose'
// import learnerSchema from '../schema/LearnerSchema.js'

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

mongoose.models = {};

export const Question = mongoose.model('Question', questionSchema)