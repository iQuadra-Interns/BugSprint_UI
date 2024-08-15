import React, {useState} from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import SignInForm from './SignInForm';
import './SignIn.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import logoLight from '../images/logo-light.png';

const SignIn = () => {

    return (
        <>
            <Container>
                <Row>
                    <Col md={8}>
                        <img src={logoLight} className="logoLight" alt = "logo"/>
                        <h1 className="SignInTitle">Effortless Bug Tracking and Collaboration</h1>
                        <h2 className="SignInText">Unveiling the Bug Hunt: Tracking, Squashing, and Enhancing for a Glitch-Free Experience!</h2>
                    </Col>
                    <Col md={4}>
                        <SignInForm/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SignIn;
