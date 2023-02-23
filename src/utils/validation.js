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
    name: Yup.string().required('A name is required.'),
    email: Yup.string().email('Please provide a valid email address.').required("An email address is required."),
    password: Yup.string().required('A password is required.')
})
export const signInValidationSchema = Yup.object({
    email: Yup.string().email('Please provide a valid email address.').required("An email address is required."),
    password: Yup.string().required('Password is required')
})