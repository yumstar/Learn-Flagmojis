import { countrySchema } from "./CountryModel";
import { questionSchema } from "./QuestionModel";

export const countryQuestionListSchema = new mongoose.Schema({
    code: {
        type: countrySchema,
        required: true,
    },
    list: [QuestionSchema]
})