import mongoose from 'mongoose'
import { countrySchema } from '../schema/CountrySchema.js'
import { questionSchema } from '../schema/QuestionSchema.js'
const countryQuestionListSchema = new mongoose.Schema({
    country: {
        type: countrySchema,
        required: true,
    },
    list: [questionSchema]
  })
