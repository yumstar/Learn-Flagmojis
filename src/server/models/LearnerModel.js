import mongoose from 'mongoose'
// import learnerSchema from '../schema/LearnerSchema.js'
import Joi from 'joi'
import { JoiPasswordComplexity } from 'joi-password-complexity'

const learnerSchema = new mongoose.Schema({
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
mongoose.models = {};

export const Learner = mongoose.model('Learner', learnerSchema)


export const validateSchema = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
        password: JoiPasswordComplexity.required().label("Password")
    })
    return schema.validate(data)
}


