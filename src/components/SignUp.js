import {signUpInitValues, signUpValidationSchema} from "../utils/validation"
// import { Formik, Form, Field, ErrorMessage } from "formik"
import {useFormik} from 'formik'
import { sendApi } from "@/utils/api"

export default function SignUp() {
    const handleSubmit = (values) => sendApi(values, "/api/LearnerCreate/") 
    // return (
    // <div className="sign-up">
    //     <Formik
    //     initialValues={signUpInitValues}
    //     validationSchema={signUpValidationSchema}
    //     onSubmit={handleSubmit}
    //     >
    //         <Form>
    //         <label htmlFor="name">Name</label>
    //         <Field name="name" type="text" />
    //         <ErrorMessage name="name" />
    //         <br/>
    //         <label htmlFor="email">E-mail</label>
    //         <Field name="email" type="email" />
    //         <ErrorMessage name="email" />
    //         <br/>
    //         <label htmlFor="password">Password</label>
    //         <Field name="password" type="text" />
    //         <ErrorMessage name="password" />
    //         <br/>
    //         <button type="submit">Submit</button>
    //         </Form>
    //     </Formik>
    // </div>
    )
}