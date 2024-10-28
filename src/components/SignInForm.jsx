import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';  
import { FiUser } from 'react-icons/fi';
import { PiLockOpen } from 'react-icons/pi';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import './SignIn.css';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import logoLight from '../images/logo-light.png';
import { useDispatch } from 'react-redux'; 
import { loginSuccess } from '../store/authActions'; 
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Please enter the email'),
        password: Yup.string().required('Please enter the password'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        setErrorMessage('');  
        try {
            // Sending POST request
            const response = await axios.post('https://c2r3hnk5frqsa6l7zbl43je7cu0lqjyy.lambda-url.us-east-1.on.aws/api/sign-in', {
                email: values.email,
                password: values.password,
            });

            console.log("Response Status:", response.status);
            console.log("Response Data:", response.data);

            // Verify both status and response data to ensure sign-in success
            if (response.status === 200 && response.data && response.data.status.status === true) {
                // Dispatch login action to Redux store
                dispatch(loginSuccess(response.data));
                // Redirect to the profile page after successful sign-in
                navigate('/MyProfile');
            } else {
                // Log unexpected response for debugging
                console.log("Unexpected response:", response);
                setErrorMessage(response.data.status.message || 'Sign-in failed. Please try again.');
            }
        } catch (error) {
            // Log full error response for debugging
            console.error("Sign-in error:", error);
            if (error.response) {
                // Show the detailed error message if available
                setErrorMessage(`Sign-in failed: ${error.response.data.message || 'Invalid credentials.'}`);
            } else {
                setErrorMessage('Error occurred during sign-in. Please check your connection.');
            }
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
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
                                    type={showPassword ? 'text' : 'password'}
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
                                <button type="submit" className="SignInFormSubmit" disabled={loading}>
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </button>
                            </div>
                            {errorMessage && <div className="error">{errorMessage}</div>}
                        </Form>
                    </Card>
                </Container>
            )}
        </Formik>
    );
};

export default SignInForm;
