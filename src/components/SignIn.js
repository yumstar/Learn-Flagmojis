/** @jsxImportSource theme-ui */
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useRef } from "react"
import {signInInitValues, signInValidationSchema} from "../utils/validation"
import { sendApi } from "@/utils/api"
import { isNotEmptyString } from "../utils/string"
import { Box, Label, Button, Text, Container, Link } from "theme-ui"
import { AuthFormContainerStyles, AuthFormOuterStyles, AuthFormStyles, fieldStyles} from "@/styles/authenticationStyles"
import { useRouter } from "next/router"
import AuthError from "./AuthError"
export default function SignIn() {
    const router  = useRouter()
    const handleSubmit = async (values) => {
        const res = await sendApi(values, "/api/LearnerLogin/");
        localStorage.setItem("userToken", res.data.token)
        router.push("/")
    }

    return (<Box className="sign-in-container" sx={AuthFormContainerStyles}>
        <div className="sign-in" sx={AuthFormOuterStyles}>
            <Formik
                initialValues={signInInitValues}
                validationSchema={signInValidationSchema}
                onSubmit={handleSubmit}>
                {({ errors, touched }) => (<Form sx={AuthFormStyles}>
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
                    <Button variant="submit" type="submit">Sign In</Button>
                </Form>
                )
                }
            </Formik>
            <div className="sign-in-redirect">
                <Text variant="default">Need an account?</Text>
                <br/>
                <Link href="/auth/LearnerSignUp"><Text variant="link">Sign Up!</Text></Link>
            </div>
        </div>
        

    </Box>)
}