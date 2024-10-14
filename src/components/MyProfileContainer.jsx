import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import profile_pic from '../images/profile_pic.png';
import './MyProfile.css';

const MyProfileContainer = ({ user }) => {
    if (!user) {
        // If the user data is not loaded, show a loading message or a fallback
        return <p>Loading user data...</p>;
    }

    return (
        <Container className="profileContainer">
            <Card className="profileCard">
                <img src={profile_pic} className="profilePicture" alt="Profile" />
                <h3 className="title">My Profile</h3>
                <Row>
                    <Col>
                        <p className="description">Name:</p>
                        <p className="description">Role:</p>
                        <p className="description">Email:</p>
                        <p className="description">Contact:</p>
                    </Col>
                    <Col>
                        {/* Dynamically display user data */}
                        <p className="detail">{user.developer_details.first_name}</p>
                        <p className="detail">{user.role}</p>
                        <p className="detail">{user.email}</p>
                        <p className="detail">{user.contact}</p>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default MyProfileContainer;
