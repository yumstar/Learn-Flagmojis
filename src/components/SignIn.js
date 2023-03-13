/** @jsxImportSource theme-ui */
import { Formik, Form, Field, ErrorMessage } from "formik"
import { signInInitValues, signInValidationSchema } from "../utils/validation"
import { sendApi } from "@/utils/api"
import { isNotEmptyString } from "../utils/string"
import { Box, Label, Button, Text, Spinner, Link } from "theme-ui"
import { AuthFormContainerStyles, AuthFormOuterStyles, AuthFormStyles, fieldStyles } from "@/styles/authenticationStyles"
import { useRouter } from "next/router"
import AuthError from "./AuthError"
import { useState, useEffect } from "react"
import AuthMessage from "./AuthMessage"
export default function SignIn() {
    const [waitingRes, setWaitingRes] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const router = useRouter()
    const {signUpRedirect} = router.query;
    useEffect(() => {
        if(signUpRedirect){
            setMessageType("SUCCESS");
            setMessage("Your account has been created. Please sign in.")
        }
        return 
    }, [signUpRedirect]); 
    const handleSubmit = async (values) => {
        setWaitingRes(true)
        const res = await sendApi(values, "/api/LearnerLogin/");
        // localStorage.setItem("userToken", res.data.token)
        // console.log(res)
        setWaitingRes(false)
        router.push("/")
    }

    return (<Box className="sign-in-container" sx={AuthFormContainerStyles}>
        <div className="sign-in" sx={AuthFormOuterStyles}>
            <Formik
                initialValues={signInInitValues}
                validationSchema={signInValidationSchema}
                onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                    <Form sx={AuthFormStyles}>
                        {isNotEmptyString(message) && isNotEmptyString(messageType) && (<AuthMessage type={messageType}>
                            {message}
                        </AuthMessage>)}
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button variant="submit" type="submit">Sign In</Button>
                            {waitingRes && <Spinner sx={{ color: 'secondary', position: 'relative', right: '5em' }} />}
                        </Box>
                    </Form>
                )
                }
            </Formik>
            <div className="sign-in-redirect">
                <Text variant="default">Need an account?</Text>
                <br />
                <Link href="/auth/LearnerSignUp"><Text variant="link">Sign Up!</Text></Link>
            </div>
        </div>


    </Box>)
}