import { questionSchema } from "./QuestionModel"
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

export const QuestionResult = mongoose.model('QuestionResult', questionResultSchema)