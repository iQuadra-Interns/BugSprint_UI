import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';
// import NavigationBar from './components/NavigationBar';
import SideBar from './Sidebar';
import MyProfileContainer from './MyProfileContainer';
import './MyProfile.css'

function MyProfile() {

    return (
      <>
        <Container fluid className="mainContainer">
          <Row className="h-100 m-0">
            <Col xs={2} className="p-0">
              <SideBar/>
            </Col>
            <Col xs={10}>
              <MyProfileContainer/>
            </Col>
          </Row>
        </Container>
        
      </>
    )
  }
  
  export default MyProfile
