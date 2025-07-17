import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from './Sidebar';
import MyProfileContainer from './MyProfileContainer';
import './MyProfile.css';

function MyProfile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Container fluid className="mainContainer">
      <Row className="h-100">
        <Col xs={12} lg={2} className="p-0 sidebar-col">
          <SideBar />
        </Col>
        <Col xs={12} lg={10} className="content-col">
          <MyProfileContainer user={user} />
        </Col>
      </Row>
    </Container>
  );
}

export default MyProfile;