import mongoose from 'mongoose'
import { questionSchema } from '../schema/QuestionSchema.js'
export const questionResultSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    question: {
        type: questionSchema,
        required: true,
    },
    result: {
        type: Number,
        required: true
    }
})

mongoose.models = {};
export const QuestionResult = mongoose.model('QuestionResult', questionResultSchema)