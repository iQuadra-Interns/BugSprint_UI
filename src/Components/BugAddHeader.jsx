import React from 'react'
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';


function BugAddHeader() {
  return (
    <div>
        <Container>
            <Row>
                <Col md = {2}>
                    <button>Back Arrow</button>
                </Col>
                <Col md = {2}>
                    <p>Create Bug</p>
                </Col>
                <Col md={{ span: 2, offset: 6 }}>
                    <button>Save</button>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default BugAddHeader
