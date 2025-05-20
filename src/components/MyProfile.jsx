import { useSelector } from 'react-redux'; // Import useSelector
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from './Sidebar';
import MyProfileContainer from './MyProfileContainer';
import './MyProfile.css';

function MyProfile() {
    // Get user data from Redux store
    const user = useSelector((state) => state.auth.user);
    return (
        <Container fluid className="mainContainer">
            <Row className="h-100">
                <Col xs={2} className="p-0 ">
                    <SideBar />
                </Col>
                <Col xs={10}>
                    {/* Pass the user data as a prop */}
                    <MyProfileContainer user={user} />
                </Col>
            </Row>
        </Container>
    );
}

export default MyProfile;
