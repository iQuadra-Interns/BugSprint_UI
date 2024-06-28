import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function BugAddHeader() {
  return (
    <div>
        <Container>
            <Row>
                <Col>
                    <button>Back Arrow</button>
                </Col>
                <Col>
                    <h1>Create Bug</h1>
                </Col>
                <Col>
                    <button>Save</button>
                </Col>
            </Row>

        </Container>
        
        
      
    </div>
  )
}

export default BugAddHeader
