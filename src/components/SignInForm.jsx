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

const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);

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

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {(props) => {
                return (
                    <Card class="SignInFormCard">
                        <Container>
                            <Form>
                                <img src={logoLight} className="logoLightSignInForm" alt = "logo"/>
                                <p>
                                    <FiUser class="SignInIconsUser"/>
                                    <input type="text" name="email" value={props.values.email} onChange={props.handleChange} onBlur={props.handleBlur} placeholder="Email Id" class="SignInFormInput"/>
                                        {props.errors.email && props.touched.email && (
                                            <p className="error">{props.errors.email}</p>
                                        )}
                                </p>
                                <p>
                                    <PiLockOpen class="SignInIconsLock"/>
                                    <input type="password" name="password" value={props.values.password} onChange={props.handleChange} onBlur={props.handleBlur} placeholder="Password" class="SignInFormInput"/>
                                        {props.errors.password && props.touched.password && (
                                        <p className="error">{props.errors.password}</p>)}
                                    <AiOutlineEyeInvisible class="SignInIconsEye"/>
                                </p>
                                <p>
                                    <label class="SignInFormForgotPassword">Forgot Password?</label>
                                </p>
                                <p>
                                    <button type="submit" class="SignInFormSubmit" onClick={handleSubmit}>Sign In</button>
                                </p>
                            </Form>
                    
                        </Container>
                    </Card>
                )
            }}
        </Formik>
    );
};

export default SignInForm;
