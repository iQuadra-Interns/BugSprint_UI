import React from 'react';
import { Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { Search } from 'lucide-react';


function Controls() {
  return (
    <Row className="mb-3 mt-5 align-items-center">
        <Col xs={12} md={6} lg={4}>
        <InputGroup className="mb-3">
        <InputGroup.Text className="bg-white border-end-0">
            <Search />
        </InputGroup.Text>
        <Form.Control
            placeholder="Search"
            className="border-start-0"
            style={{ boxShadow: 'none', borderRight: 'none' }}
          />
      </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={8}>
            Rest of the Controls
        </Col>
    </Row>
  );
}

export default Controls;