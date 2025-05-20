// src/components/TestCases/TestCases.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import SideBar from "../Sidebar";
import TestCasesList from "../TestCasesList/TestCasesList";
import AddTestCases from "./AddTestCases"; // ✅ Import the popup component
import "./TestCases.css";

const TestCases = () => {
  const [testcases, setTestcases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false); // ✅ State for showing popup

  const handleAddTestCase = () => {
    setShowPopup(true); // ✅ Show the popup on button click
  };

  const fetchTestCases = async () => {
    try {
      const response = await axios.get(
        "https://6igl2ic4ro3ans7cghpqod2hly0gaxfs.lambda-url.us-east-1.on.aws/api/get-test-cases"
      );
      const data = response.data?.test_cases;
      setTestcases(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      setError("Failed to load test cases.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestCases();
  }, []);

  return (
    <Container fluid className="mainContainer">
      <Row className="h-100">
        <Col xs={2} className="p-0 sidebar-container">
          <SideBar />
        </Col>
        <Col xs={10} className="content-container">
          <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
            <h4 className="mb-0">Test Cases</h4>
            <Button variant="success" onClick={handleAddTestCase}>
              + Add Test Case
            </Button>
          </div>
          <div className="testcases-container">
            {loading && <div className="text-center">Loading...</div>}
            {error && <div className="text-center text-danger">{error}</div>}
            {!loading && !error && (
              testcases.length > 0 ? (
                <TestCasesList testcases={testcases} />
              ) : (
                <div className="text-center">No test cases found.</div>
              )
            )}
          </div>
        </Col>
      </Row>

      {/* ✅ Render the AddTestCases popup when showPopup is true */}
      {showPopup && (
        <AddTestCases
          onClose={() => {
            setShowPopup(false);
            fetchTestCases(); // ✅ Refresh test case list after submission
          }}
        />
      )}
    </Container>
  );
};

export default TestCases;
