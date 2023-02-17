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
export const signUpValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Please provide a valid email address.').required(),
    password: Yup.string().required('Password is required')
})
export const signImValidationSchema = Yup.object({
    email: Yup.string().email('Please provide a valid email address.').required(),
    password: Yup.string().required('Password is required')
})