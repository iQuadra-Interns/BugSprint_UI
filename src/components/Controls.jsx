import React from 'react';
import { Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { Search, Filter, ArrowUpDown } from 'lucide-react';


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
        <Col xs={12} md={6} lg={8} className="d-flex justify-content-md-end">
        <Button variant="outline-secondary" className="me-2">
          <Filter size={18} className="me-2" />
          Filter
        </Button>
        <Button variant="outline-secondary" className="me-2">
          <ArrowUpDown size={18} className="me-2" />
          Sort
        </Button>
        <Button variant="success">
          + Create Bug
        </Button>
      </Col>
    </Row>
  );
}

export default Controls;