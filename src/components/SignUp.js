/** @jsxImportSource theme-ui */
import {signUpInitValues, signUpValidationSchema} from "../utils/validation"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { Box, Text, Label, Button } from "theme-ui"
import isNotEmptyString from "../utils/string"
import { fieldStyles, AuthFormContainerStyles, AuthFormStyles } from "@/styles/authenticationStyles"
// import {useFormik, Formik} from 'formik'
import { sendApi } from "@/utils/api"
import AuthError from "./AuthError"

export default function SignUp() {
  const handleSubmit = (values) => sendApi(values, "/api/LearnerCreate/")

  return ( <Box className="sign-up-container" sx={AuthFormContainerStyles}>
    <div className="sign-up" sx={AuthFormStyles}>
      <Formik
        initialValues={signUpInitValues}
        validationSchema={signUpValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
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
          <Button variant="submit" type="submit">Submit</Button>
        </Form>
  )
        }
      </Formik>
    </div>
    </Box>
  )
    }

    
