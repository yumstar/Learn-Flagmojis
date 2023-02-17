import { Formik, Form, Field, ErrorMessage } from "formik"
import { useRef } from "react"
import {signInInitValues, signInValidationSchema} from "../utils/validation"
import { sendApi } from "@/utils/api"
export default function SignIn() {
    return (<>
    <div className="sign-in">
        <Formik
        initialValues={signInInitValues}
        validationSchema={signInValidationSchema}
        onSubmit={(values) => sendApi(values, "/api/LearnerLogin/")}>
            <Form>
            <label htmlFor="email">E-mail</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
            <br/>
            <label htmlFor="password">Password</label>
            <Field name="password" type="text" />
            <ErrorMessage name="password" />
            <br/>
            <button type="submit">Submit</button>
            </Form>
        </Formik>
    </div>
    </>)
}