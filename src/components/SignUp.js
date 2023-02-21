import {signUpInitValues, signUpValidationSchema} from "../utils/validation"
import { Formik, Form, Field, ErrorMessage } from "formik"
import React from "react"
// import {useFormik, Formik} from 'formik'
import { sendApi } from "@/utils/api"

export default function SignUp() {
    const handleSubmit = (values) => console.log(values)
    //     const formik = useFormik({
    //         initialValues: signUpInitValues,
    //         validationSchema: signUpValidationSchema,
    //         onSubmit : (values) => handleSubmit(values)
    //     })
    // return(<form onSubmit={formik.handleSubmit}>
    //        <label htmlFor="name">Name</label>
    //        <input id="name" type="text" {...formik.getFieldProps('name')} />
    //        {formik.touched.name && formik.errors.name ? 
    //        (<div>{formik.errors.firstName}</div>) : null}
    //         {/* <label htmlFor="name">Name</label>
    //        <input id="name" type="text" {...formik.getFieldProps('name')} />
    //        {formik.touched.name && formik.errors.name ? 
    //        (<div>{formik.errors.firstName}</div>) : null} */}
    //     </form>
    // )
        // }
  return (
    <div className="sign-up">
      <Formik
        initialValues={signUpInitValues}
        validationSchema={signUpValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />
          <br />
          <label htmlFor="email">E-mail</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />
          <br />
          <label htmlFor="password">Password</label>
          <Field name="password" type="text" />
          <ErrorMessage name="password" />
          <br />
          <button type="submit">Submit</button>
        </Form>
  )
        }
      </Formik>
    </div>
  )
    }

    
// }
// import { useState } from "react";
// export default function ContactAdd(){


//     const [accountInfo, setAccountInfo] = useState({
//         name: "",
//         email: "",
//         password: ""
//     })
    
//     const onChangeFirstName = (e) => {
//         setAccountInfo({...accountInfo, name: e.target.value})
//     }
//     const onChangeLastName = (e) => {
//         setContact({...contact, lastName: e.target.value})
//     }
//     // const onChangeBirthday = (e) => {
//     //     setContact({...contact, firstName: e.target.value})
//     // }
//     const onChangeEmail = (e) => {
//         setContact({...contact, email: e.target.value})
//     }
    
//     const onChangePhone = (e) => {
//         setContact({...contact, phone: e.target.value})
//     }
    
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         axios({
//             method: "POST",
//             url: "http://localhost:5000/contact/addContact",
//             data: contact
//         })
//         .then((res) => {
//             if (res.status >= 200 && res.status < 300) {
//               setToastMessage(res.data);
//               setShowToast(true)
//               setTimeout(() => {window.location.reload();}, 1000)
//             }
//         }).catch((error) => {
//             setToastMessage(error.response.data.error);
//             setShowToast(true)
//         })
//     }
    
//     //TO DO: replace with floating labels if have time
//     // TO DO: modal-ize
//      return(<Container className="contact-add">
//       <Container className="contact-add-form">
//         <Form>
//           <h2 className="h2 mt-3">Add a friend</h2>
//           <RiContactsBookLine className="fs-1"/>
//             <Form.Group controlId="inputfirstName">
//             <FloatingLabel controlId="floatingLabelFirstName" label="First Name" className="mt-3 text-muted">
//             <Form.Control type="text" placeholder="First Name" value={contact.firstName} onChange={onChangeFirstName}/>
//             </FloatingLabel>
//           </Form.Group>
//           <Form.Group controlId="inputLastName">
//             <FloatingLabel controlId="floatingLabelLastName" label="Last Name" className="mt-3 text-muted">
//             <Form.Control type="text" placeholder="Last Name" value={contact.lastName} onChange={onChangeLastName}/>
//             </FloatingLabel>
//           </Form.Group>
//           <Form.Group controlId="inputPhone">
//             <FloatingLabel controlId="floatingLabelPhone" label="Phone" className="mt-3 text-muted">
//             <Form.Control type="text" placeholder="Phone" value={contact.phone} onChange={onChangePhone}/>
//             </FloatingLabel>
//             <Form.Text className="text-muted">
//               (Optional)
//             </Form.Text>
//           </Form.Group>
//           <Form.Group controlId="inputEmail">
//             <FloatingLabel controlId="floatingLabelEmail" label="Email" className="mt-3 text-muted">
//             <Form.Control type="email" placeholder="Email" value={contact.email} onChange={onChangeEmail}/>
//             </FloatingLabel>
//             <Form.Text className="text-muted">
//               (Optional)
//             </Form.Text>
//           </Form.Group>
//           {/* <Form.Text>Birthday</Form.Text>
//           <Row>
//           <Form.Group controlId="inputBirthdayMonth">
//             <Form.Label>Month</Form.Label>
//             <Form.Control type="" placeholder="Email" value={contact.email} onChange={onChangeEmail}/>
//           </Form.Group>
//           </Row> */}
    
//           <Button type="submit" onClick={handleSubmit} className="m-3"variant="success" size="lg">Add Contact</Button>
//         </Form>
//         </Container>
//         <ToastContainer position="bottom-end">
//         <Toast show={showToast} onClose={toggleShowToast}>
//               <Toast.Header>
//                 <strong className="me-auto">In-voi-tations</strong>
//                 <small>Friends</small>
//               </Toast.Header>
//               <Toast.Body>{toastMessage}</Toast.Body>
              
//             </Toast>
//         </ToastContainer>
//         </Container>
//         )
//     }
// import React from 'react';
// import { Formik } from 'formik';
// import * as Yup from 'yup';

// const SignupForm = () => {
//   return (
//     <Formik
//       initialValues={{ firstName: '', lastName: '', email: '' }}
//       validationSchema={Yup.object({
//         firstName: Yup.string()
//           .max(15, 'Must be 15 characters or less')
//           .required('Required'),
//         lastName: Yup.string()
//           .max(20, 'Must be 20 characters or less')
//           .required('Required'),
//         email: Yup.string().email('Invalid email address').required('Required'),
//       })}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {formik => (
//         <form onSubmit={formik.handleSubmit}>
//           <label htmlFor="firstName">First Name</label>
//           <input
//             id="firstName"
//             type="text"
//             {...formik.getFieldProps('firstName')}
//           />
//           {formik.touched.firstName && formik.errors.firstName ? (
//             <div>{formik.errors.firstName}</div>
//           ) : null}

//           <label htmlFor="lastName">Last Name</label>
//           <input
//             id="lastName"
//             type="text"
//             {...formik.getFieldProps('lastName')}
//           />
//           {formik.touched.lastName && formik.errors.lastName ? (
//             <div>{formik.errors.lastName}</div>
//           ) : null}

//           <label htmlFor="email">Email Address</label>
//           <input id="email" type="email" {...formik.getFieldProps('email')} />
//           {formik.touched.email && formik.errors.email ? (
//             <div>{formik.errors.email}</div>
//           ) : null}

//           <button type="submit">Submit</button>
//         </form>
//       )}
//     </Formik>
//   );
// };

// export default SignupForm