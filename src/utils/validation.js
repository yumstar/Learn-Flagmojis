import * as Yup from 'yup'
export const signUpInitValues = {
    name: "",
    email: "",
    password: ""
}
export const signInInitValues = {
    email: "",
    password: ""
}
export const quizInitValues = (questions) => {
    var initValues = {}
    questions.forEach((question) => {
        if(question.type === null || typeof question.type != "string") {
            throw console.error(`Invalid question type data type for ${question.question}`);
        }
        else if(!Array.isArray(question.answers)) {
            throw console.error(`Invalid question answer data type for ${question.question}`);
        }
        
        if(question.isMultiAnswer) {
            initValues[question.type] = []
        }
        else {
            initValues[question.type] = ""
        }
    })
    return initValues
}
export const signUpValidationSchema = Yup.object({
    name: Yup.string().required('A name is required.'),
    email: Yup.string().email('Please provide a valid email address.').required("An email address is required."),
    password: Yup.string().required('A password is required.')
})
export const signInValidationSchema = Yup.object({
    email: Yup.string().email('Please provide a valid email address.').required("An email address is required."),
    password: Yup.string().required('Password is required')
})