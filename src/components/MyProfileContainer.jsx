import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import profile_pic from '../images/profile_pic.png';
import './MyProfile.css';

const MyProfileContainer = () => {
    const user = useSelector((state) => state.auth.user); // Get the user from Redux state
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check if the user is authenticated

    if (!isAuthenticated) {
        // If the user is not authenticated, show a message
        return <p>Please log in to view your profile.</p>;
    }

    if (!user) {
        // If the user data is not yet available, show a loading message
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
                        <p className="detail">{user.developer_details.first_name + " " + user.developer_details.last_name}</p>
                        <p className="detail">{user.usr.user_category}</p>
                        <p className="detail">{user.developer_details.email}</p>
                        <p className="detail">{user.developer_details.isd + " " + user.developer_details.mobile_number}</p>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default MyProfileContainer;
