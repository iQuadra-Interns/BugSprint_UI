import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import {Row, Col, Container} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import profile_pic from "../images/profile_pic.png";
import './MyProfile.css'

export default function MyProfile() {
    return (
        <Container className="profileContainer">
            <Card className="profileCard">
                <img src={profile_pic} className="profilePicture" alt="Profile"/>
                <h3 className="title">My Profile</h3>
                <Row>
                    <Col>
                        <p className="description">Name:</p>
                        <p className="description">Role:</p>
                        <p className="description">Email:</p>
                        <p className="description">Contact:</p>
                    </Col>
                    <Col>
                        <p className="details">Hari Krishna</p>
                        <p className="details">Admin</p>
                        <p className="details">hari.k@iquadra.com</p>
                        <p className="details">+91 9898989898</p>
                    </Col>
                </Row>
            </Card>
        </Container>
    )

}

