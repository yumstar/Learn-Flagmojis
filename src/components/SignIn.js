import { Formik, Form, Field, ErrorMessage } from "formik"
import { useRef } from "react"
import {signInInitValues, signInValidationSchema} from "../utils/validation"
import { sendApi } from "@/utils/api"
import { Container, Label } from "theme-ui"
export default function SignIn() {

    const signInStyles = {
        fontFamily: 'body',
        fontSize: 3,
        display: 'flex',
        justifyContent: 'center',
        border: '1px solid black'
    }
    return (<>
    <Container className="sign-in" sx={signInStyles}>
        <Formik
        initialValues={signInInitValues}
        validationSchema={signInValidationSchema}
        onSubmit={(values) => sendApi(values, "/api/LearnerLogin/")}>
            <Form>
            {/* <label htmlFor="email">E-mail</label> */}
            <Label>E-mail:</Label>
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
    </Container>
    </>)
}