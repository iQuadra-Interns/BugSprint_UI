import React, { useState } from 'react';
import { Form, InputGroup, Button, Row, Col, Dropdown, Modal } from 'react-bootstrap';
import { Search, Filter } from 'lucide-react';
import SortButton from './SortButton';

function Controls() {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const toggleSortDropdown = () => setShowSortDropdown(!showSortDropdown);
  const toggleFilterModal = () => setShowFilterModal(!showFilterModal);

  const filterOptions = [
    'Reported by', 'Product Name', 'Environment', 'Testing Medium',
    'Scenario', 'Priority', 'Status', 'Assignee', 'Root cause Location'
  ];

  return (
    <>
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
          <Button variant="outline-secondary" className="me-2" onClick={toggleFilterModal}>
            <Filter size={18} className="me-2" />
            Filter
          </Button>
          <SortButton/>
          <Button variant="success">
            + Create Bug
          </Button>
        </Col>
      </Row>

      <Modal show={showFilterModal} onHide={toggleFilterModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {filterOptions.map((option, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" id={`dropdown-${option.replace(' ', '-')}`}>
                    {option}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Option 1</Dropdown.Item>
                    <Dropdown.Item>Option 2</Dropdown.Item>
                    <Dropdown.Item>Option 3</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={toggleFilterModal}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Controls;