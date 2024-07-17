import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import {Row, Col, Container} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';

export default function MyProfile() {
    return (
        <Container>
            <Card>
                <Row>
                    <Col>
                        <p>Name:</p>
                        <p>Role:</p>
                        <p>Email:</p>
                        <p>Contact:</p>
                    </Col>
                    <Col>
                        <p>Hari Krishna</p>
                        <p>Admin</p>
                        <p>hari.k@iquadra.com</p>
                        <p>+91 9898989898</p>
                    </Col>
                </Row>
            </Card>
        </Container>
    )

}

