import SideBar from './Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import Controls from './Controls';
import BugList from './Bugslist';

function BugsListScreen() {
  return (
    <Container fluid className="mainContainer">
      <Row className="h-100">
        {/* Sidebar Section */}
        <Col xs={2} className="p-0 sidebar-container">
          <SideBar />
        </Col>
        
        {/* Main Content Section */}
        <Col xs={10} className="content-container">
          <div className="controls-container">
            <Controls />
          </div>
          <div className="buglist-container">
            <BugList />
          </div>
        </Col>
      </Row>
    </Container>   
  );
}

export default BugsListScreen;
