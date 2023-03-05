
export const countrySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    }
})

export const Country = mongoose.model('Country', countrySchema)