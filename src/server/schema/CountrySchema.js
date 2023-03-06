import mongoose from 'mongoose'

export const countrySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    }
})