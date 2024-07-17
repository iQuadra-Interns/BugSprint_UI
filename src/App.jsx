import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css'
// import NavigationBar from './components/NavigationBar';
import SideBar from './components/Sidebar';



function App() {

  return (
    <>
      <Container fluid className="vh-100 p-0">
        <Row className="h-100 m-0">
          <Col xs={2} className="p-0">
            <SideBar />
          </Col>
          <Col xs={10}>
            <p>2 of 2</p>
            <p>hello</p>
          </Col>
        </Row>
        
      </Container>
      
    </>
  )
}

export default App