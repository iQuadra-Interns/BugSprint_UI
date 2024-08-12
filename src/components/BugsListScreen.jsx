import SideBar from './Sidebar';
import { useEffect } from 'react';
import Controls from './Controls';
import BugList from './Bugslist';
import { Container, Row, Col } from 'react-bootstrap';

function BugsListScreen() {

  useEffect(() => {
    document.title = "My Dashboard";
  }, []);

    return (
      <>
        <Container fluid className="mainContainer">
        <Row className="h-100">
          <Col xs={2} className="p-0">
            <SideBar />
          </Col>
          <Col xs={10}>
          <div>
            <Controls/>
            <BugList />
          </div>
          </Col>
        </Row>
        </Container>   
      </>
    )
  }
  
  export default BugsListScreen
