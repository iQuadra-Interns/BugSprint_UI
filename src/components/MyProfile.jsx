import { useSelector } from 'react-redux'; // Import useSelector
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from './Sidebar';
import MyProfileContainer from './MyProfileContainer';
import './MyProfile.css';

function MyProfile() {
    const user = useSelector((state) => state.auth.user); // Get user from Redux store

    return (
        <>
            <Container fluid className="mainContainer">
                <Row className="h-100">
                    <Col xs={2} className="p-0">
                        <SideBar />
                    </Col>
                    <Col xs={10}>
                        <MyProfileContainer user={user} /> {/* Pass user to MyProfileContainer */}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MyProfile;
