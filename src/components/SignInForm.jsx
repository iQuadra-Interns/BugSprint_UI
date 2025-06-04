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
        // setErrorMessage('');  
        try {
            const response = await axios.post('https://c2r3hnk5frqsa6l7zbl43je7cu0lqjyy.lambda-url.us-east-1.on.aws/api/sign-in', {
                email: values.email,
                password: values.password,
            });

            if (response.status === 200 && response.data && response.data.status.status === true) {
                dispatch(loginSuccess(response.data));
                // Redirect to the profile page after successful sign-in
                navigate('/MyDashBoard');
            } else {
                setErrorMessage(response.data.status.message || 'Sign-in failed. Please try again.');
            }
        } catch (error) {
            if (error.response) {
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
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, isSubmitting }) => (
          <Container className="FormContainer">
            <Card className="FormCard">
              <Form noValidate>
                <img src={logoLight} className="logoLightSignInForm" alt="logo" />
  
                {/* Email */}
                <div className="InputContainer">
                  <FiUser className="SignInIconsUser" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email Id"
                    className="SignInFormInput"
                  />
                </div>
                {errors.email && <div className="error">{errors.email}</div>}
  
                {/* Password */}
                <div className="InputContainer">
                  <PiLockOpen className="SignInIconsLock" />
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="SignInFormInput"
                  />
                  {showPassword ? (
                    <AiOutlineEye className="SignInIconsEye" onClick={togglePasswordVisibility} />
                  ) : (
                    <AiOutlineEyeInvisible className="SignInIconsEye" onClick={togglePasswordVisibility} />
                  )}
                </div>
                {errors.password && <div className="error">{errors.password}</div>}
  
                <label className="SignInFormForgotPassword">Forgot Password?</label>
  
                <button type="submit" className="SignInFormSubmit" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing in…' : 'Sign In'}
                </button>
  
                {errorMessage && <div className="error">{errorMessage}</div>}
              </Form>
            </Card>
          </Container>
        )}
      </Formik>
    );
};

export default SignInForm