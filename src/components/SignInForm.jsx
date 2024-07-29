import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiUser } from 'react-icons/fi';
import { PiLockOpen } from 'react-icons/pi';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import './SignIn.css';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import logoLight from '../images/logo-light.png';
import axios from 'axios';
import { Toast, ToastContainer } from 'react-bootstrap';



const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [show, setShow] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('danger');

    const showToast = (message, isSuccess) => {
        setToastMessage(message);
        setToastVariant(isSuccess ? 'success' : 'danger');
        setShow(true);
    };

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Please enter the email'),
        password: Yup.string().required('Please enter the password'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        const sendDetails = async() => {
            try{

                const response = await axios.post('http://127.0.0.1:9500/signin/api/sign-in', {
                    email: values.email,
                    password: values.password
                })

                if (response.data.status.sts) {
                    showToast("Authentication Successful", true);
                  } else {
                    showToast("Invalid Email id or Password", false);
                }

            } catch (error) {
                console.error('Error:', error);
                showToast("An error occurred. Please try again.", false);

              }
        }

        sendDetails()
        setSubmitting(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <>
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg={toastVariant}>
            <Toast.Header>
                <strong className="me-auto">{toastVariant === 'success' ? 'Success' : 'Error'}</strong>
            </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
        </ToastContainer>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ handleChange, handleBlur, values }) => (
                <Container className="FormContainer">
                    <Card className="FormCard">
                        <Form>
                            <img src={logoLight} className="logoLightSignInForm" alt="logo" />
                            <div className="form-group">
                                <FiUser className="SignInIconsUser" />
                                <Field
                                    type="text"
                                    name="email"
                                    placeholder="Email Id"
                                    className="SignInFormInput"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>
                            <div className="form-group">
                                <PiLockOpen className="SignInIconsLock" />
                                <div>
                                    {showPassword ? (
                                        <AiOutlineEye className="SignInIconsEye" onClick={togglePasswordVisibility} />
                                    ) : (
                                        <AiOutlineEyeInvisible className="SignInIconsEye" onClick={togglePasswordVisibility} />
                                    )}
                                </div>
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="SignInFormInput"                                        
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="password" component="div" className="error" />
                            </div>
                            
                            <div className="form-group">
                                <label className="SignInFormForgotPassword">Forgot Password?</label>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="SignInFormSubmit">Sign In</button>
                            </div>
                        </Form>
                    </Card>
                </Container>
            )}
        </Formik>
        </>
    );
};

export default SignInForm;
