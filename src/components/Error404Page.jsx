import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Error404.css';



const Error404Page = () => {
  return (
    <Container fluid className="error-page">
     
      <Row className="top-bar align-items-center">
        <Col className="logo-container">
          <img src="/450_short_light.png" alt="BugSprint Logo" className="logo" />
          <h1 className="brand-name">BugSprint</h1>
        </Col>
        <Col className="text-right">
          <Link to="/MyDashboard" className="dashboard-link">
           My Dashboard
          </Link>
        </Col>
      </Row>

     
      <Row className="content align-items-center">
        <Col md={6} className="text-center">
          <img src="/404.png" alt="Lost Person" className="lost-person-image" />
        </Col>
        <Col md={6} className="text-center">
          <div className="page-not-found-bubble">
            Page Not Found
          </div>
          <h1 className="error-title">Uh Oh! Error 404</h1>
          <p className="error-message">
            It looks like you got lost far enough. Don't worry, try returning to the homepage.
          </p>
          <Link to="/MyProfile">
            <Button className="home-button">Back to Homepage</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404Page;
