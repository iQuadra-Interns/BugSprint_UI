import { useState } from 'react'
import React from "react"
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { FiUser } from "react-icons/fi";
import { PiLockOpen } from "react-icons/pi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import './SignIn.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap'
import logoLight from '../images/logo-light.png';

const SignInForm = () => {

    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Please enter the email"),
        password: Yup.string().required("Please enter the password"),
    });

    function handleSubmit(values, helders) {
        console.log(values)
    }
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {(props) => {
                return (
                    <Card>
                        <Container class="SignInFormCard">
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
    )
}

export default SignInForm;


