import { questionSchema } from '../schema/QuestionSchema.js'
export const questionResultSchema = new mongoose.Schema({
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