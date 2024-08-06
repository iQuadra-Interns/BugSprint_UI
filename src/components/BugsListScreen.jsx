import SideBar from './Sidebar';
import Controls from './Controls';
import BugList from './Bugslist';
import { Container, Row, Col } from 'react-bootstrap';

function BugsListScreen() {

    return (
      <>
        <Container fluid className="vh-100 p-0">
        <Row className="h-100 m-0">
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
