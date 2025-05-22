import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button, Row, Col, Modal } from "react-bootstrap";
import { Search } from "lucide-react";
import SortButton from "./SortButton";
import CreateBug from "./CreateBug/CreateBug";
import ApplyFilter from "./ApplyFilter/ApplyFilter";
import axios from "axios";

function Controls({ applyFilters }) {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showCreateBugModal, setShowCreateBugModal] = useState(false);
  const [dropdownData, setDropdownData] = useState({
    bugStatus: [],
    environments: [],
    products: [],
    rootCauseLocations: [],
    scenarios: [],
    priorities: [],
    assignees: [],
    testingMediums: [],
    reportedBy: [],
  });

  // Fetch dropdown data only once when the component is mounted
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const tableDataResponse = await axios.post(
          "https://xjhkkap5tmpwr3yjiw7nvadwra0jyiav.lambda-url.us-east-1.on.aws/fetch-table-data",
          {}
        );

        const userDataResponse = await axios.get(
          "https://xjhkkap5tmpwr3yjiw7nvadwra0jyiav.lambda-url.us-east-1.on.aws/get-user-details"
        );

        const tableData = tableDataResponse.data.data || {};
        const userData = userDataResponse.data.users || [];

        setDropdownData({
          bugStatus: tableData.bug_status || [],
          environments: tableData.environments || [],
          products: tableData.products || [],
          rootCauseLocations: tableData.root_cause_location || [],
          scenarios: tableData.scenarios || [],
          priorities: tableData.priority || [],
          testingMediums: tableData.testing_medium || [],
          assignees: userData,
          reportedBy: userData,
        });
      } catch (error) {
        console.error("Error fetching dropdown/user data:", error);
      }
    };

    fetchDropdownData();
  }, []); // Runs only once when the component mounts

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
              style={{ boxShadow: "none", borderRight: "none" }}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={8} className="d-flex justify-content-md-end">
          {/* Filter Button */}
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={() => setShowFilterModal(true)}
          >
            Filter
          </Button>
          <SortButton />
          <Button variant="success" onClick={() => setShowCreateBugModal(true)}>
            + Create Bug
          </Button>
        </Col>
      </Row>

      {/* Filter Modal */}
      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)} size="lg">
        <Modal.Body>
          <ApplyFilter
            showFilterModal={showFilterModal}
            setShowFilterModal={setShowFilterModal}
            applyFilters={applyFilters}
            dropdownData={dropdownData} // Pass the fetched data to ApplyFilter
          />
        </Modal.Body>
      </Modal>

      {/* Create Bug Modal */}
      <Modal show={showCreateBugModal} onHide={() => setShowCreateBugModal(false)} size="lg">
        <Modal.Body>
          <CreateBug setShowCreateBugModal={setShowCreateBugModal} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Controls;
