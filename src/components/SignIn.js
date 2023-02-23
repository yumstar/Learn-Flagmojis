/** @jsxImportSource theme-ui */
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useRef } from "react"
import {signInInitValues, signInValidationSchema} from "../utils/validation"
import { sendApi } from "@/utils/api"
import { isNotEmptyString } from "../utils/string"
import { Box, Container, Label, Button, Text } from "theme-ui"
import { AuthFormContainerStyles, AuthFormStyles, fieldStyles} from "@/styles/authenticationStyles"
import AuthError from "./AuthError"
export default function SignIn() {
    const handleSubmit = async (values) => {trysendApi(values, "/api/LearnerLogin/")}

    return (<Box className="sign-in-container" sx={AuthFormContainerStyles}>
        <div className="sign-in" sx={AuthFormStyles}>
            <Formik
                initialValues={signInInitValues}
                validationSchema={signInValidationSchema}
                onSubmit={handleSubmit}>
                {({ errors, touched }) => (<Form>
                    <Text variant="heading">Sign In</Text>
                    <br />
                    <Label>E-mail:</Label>
                    <Field name="email" type="email" sx={fieldStyles} />
                    {isNotEmptyString(errors.email) && touched.email && <AuthError>
                        <ErrorMessage name="email" />
                    </AuthError>}
                    <br />
                    <Label>Password:</Label>
                    <Field name="password" type="password" sx={fieldStyles} />
                    {isNotEmptyString(errors.password) && touched.password && <AuthError>
                        <ErrorMessage name="password" />
                    </AuthError>}
                    <br />
                    <Button variant="submit" type="submit">Submit</Button>
                </Form>
                )
                }
            </Formik>
        </div>
    </Box>)
}