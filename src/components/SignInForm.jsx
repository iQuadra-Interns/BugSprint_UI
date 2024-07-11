import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiUser } from 'react-icons/fi';
import { PiLockOpen } from 'react-icons/pi';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import './SignIn.css';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import logoLight from '../images/logo-light.png';

const SignInForm = () => {

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
        setSubmitting(false);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
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
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="SignInFormInput"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="password" component="div" className="error" />
                                <AiOutlineEyeInvisible className="SignInIconsEye" />
                            </div>
                            <div className="form-group">
                                <label className="SignInFormForgotPassword">Forgot Password?</label>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="SignInFormSubmit" onClick={handleSubmit}>Sign In</button>
                            </div>
                        </Form>
                    </Card>
                </Container>
            )}
        </Formik>
    );
};

export default SignInForm;
