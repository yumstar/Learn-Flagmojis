/** @jsxImportSource theme-ui */
import { useRouter } from "next/router"
import {signUpInitValues, signUpValidationSchema} from "../utils/validation"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { Box, Text, Label, Button, Container } from "theme-ui"
import {isNotEmptyString} from "../utils/string.js"
import { fieldStyles, AuthFormOuterStyles, AuthFormContainerStyles, AuthFormStyles } from "@/styles/authenticationStyles"
import { sendApi } from "@/utils/api"
import AuthError from "./AuthError"
import { useState } from "react"
import AuthMessage from "./AuthMessage"

export default function SignUp() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const router  = useRouter()
  const handleSubmit = async (values) =>{
    try{
      const res = await sendApi(values, "/api/LearnerCreate/");
      router.push('/auth/LearnerSignIn')
    }
    catch(error) {
      setMessageType('failure')
      setMessage(error.response.data.message)
    }
    
    
  }


  return ( <Box className="sign-up-container" sx={AuthFormContainerStyles}>
    <div className="sign-up" sx={AuthFormOuterStyles}>
      <Formik
        initialValues={signUpInitValues}
        validationSchema={signUpValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form sx={AuthFormStyles}>
            {isNotEmptyString(message) && isNotEmptyString(messageType) && (<AuthMessage>
            {message}
              </AuthMessage>)}
           <Text variant="heading">Sign Up</Text>
           <br />
           <Label>Name:</Label>
          <Field name="name" type="text" sx={fieldStyles}/>
          {isNotEmptyString(errors.name) && touched.name && <AuthError>
          <ErrorMessage name="name" />
          </AuthError>}
          <br />
          <Label>Email:</Label>
          <Field name="email" type="email"  sx={fieldStyles}/>
          {isNotEmptyString(errors.email) && touched.email && <AuthError>
          <ErrorMessage name="email" />
          </AuthError>}
          <br />
          <Label>Password:</Label>
          <Field name="password" type="password" sx={fieldStyles}/>
         {isNotEmptyString(errors.password) && touched.password && <AuthError>
          <ErrorMessage name="password" />
          </AuthError> }
          <br />
          <Button variant="submit" type="submit">Sign Up</Button>
        </Form>
  )
        }
      </Formik>
    </div>
    </Box>
  )
    }

    
