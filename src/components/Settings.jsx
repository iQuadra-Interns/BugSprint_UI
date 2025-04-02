import { useSelector } from 'react-redux'; // Import useSelector
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from './Sidebar';
import SettingsContainer from './SettingsContainer';
import './Settings.css';

function Settings() {
    // Get user data from Redux store
    const user = useSelector((state) => state.auth.user);
    return (
        <Container fluid className="mainContainer">
            <Row className="h-100">
                <Col xs={2} className="p-0 ">
                    <SideBar />
                </Col>

                {/*Settings User Interface*/}
                <Col xs={2} className="p-1 ">
                    {/* Pass the user data as a prop */}
                    <SettingsContainer user={user} /> 
                </Col>
            </Row>
        </Container>
    );
}

export default Settings;