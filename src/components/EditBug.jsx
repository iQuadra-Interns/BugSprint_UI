import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import SideBar from "./Sidebar";
import DropDown from "./DropDown";
import Box from "./Box";
import { useNavigate } from "react-router-dom";
import BackArrow from "../assets/Arrow.png";
import edit from "../assets/Edit.png";
import "./ViewBugBackArrow.css";
import SmallBox from "./SmallBox";
import FixedBox from "./FixedBox";
import axios from "axios";
import urls from "../Baseurls";
import TitleBox from "./TitleBox";
import CreateNotificationContainer from "./Notifications";
import { GETAPI, POSTAPI } from "./Api";

function EditBug() {
  const navigate = useNavigate();
  const [baseData, SetBaseData] = useState({
    bugTitle: "S",
    status: "Open",
    scenario: "Scenario",
    product: "Product",
    environment: "Environment",
    testingMedium: "Medium",
    priority: "Priority",
    reportedBy: "Reported By",
    rootCauseLocation: "Location",
    rootCause: "Root Cause",
    solution: "Solution",
    description: "Description",
    userData: "UserData",
    createdAt: "2024-06-21 || 15:23:13",
  });

  const [dropdownOptions, setDropdownOptions] = useState({
    statusOptions: [],
    scenarioOptions: [],
    productOptions: [],
    environmentOptions: [],
    testingMediumOptions: [],
    priorityOptions: [],
    reportedByOptions: [],
    rootCauseLocationOptions: [],
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popup, setPopUp] = useState({});

  const fetchDropdownData = async () => {
    try {
      setLoading(true);
      const res = await axios.post(urls.common_constants, {});
      console.log(res.data.status.status);
      if (res.data.status.status === true) {
        setDropdownOptions({
          statusOptions: res.data.data.bug_status.map((item) => ({
            value: item.status_id,
            label: item.status_name,
          })),
          scenarioOptions: res.data.data.scenarios.map((item) => ({
            value: item.scenario_id,
            label: item.scenario_name,
          })),
          productOptions: res.data.data.products.map((item) => ({
            value: item.product_id,
            label: item.product_name,
          })),
          environmentOptions: res.data.data.environments.map((item) => ({
            value: item.environment_id,
            label: item.environment_name,
          })),
          testingMediumOptions: res.data.data.testing_medium.map((item) => ({
            value: item.medium_id,
            label: item.medium_name,
          })),
          priorityOptions: res.data.data.priority.map((item) => ({
            value: item.priority_id,
            label: item.priority_name,
          })),
          reportedByOptions: [
            { value: 1, label: "Satish" },
            { value: 2, label: "Ramya Vaddempudi" },
            { value: 3, label: "Virat" },
          ],
          rootCauseLocationOptions: res.data.data.root_cause_location.map(
            (item) => ({
              value: item.location_id,
              label: item.location_name,
            })
          ),
        });
      } else {
        console.log("once verify the request and response");
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(urls.view_bug + "/find-bug/1");

      if (response.data.status.status === true) {
        setLoading(false);
        SetBaseData({
          bugTitle: response.data.bug_details.title,
          status: response.data.bug_details.status,
          description: response.data.bug_details.description,
          userData: response.data.bug_details.user_data,
          rootCause: response.data.bug_details.root_cause,
          product: response.data.bug_details.product,
          priority: response.data.bug_details.priority,
          environment: response.data.bug_details.environment,
          rootCauseLocation: response.data.bug_details.root_cause_location,
          testingMedium: response.data.bug_details.testing_medium,
          scenario: response.data.bug_details.scenario,
          solution: response.data.bug_details.resolution,
          reportedBy: response.data.bug_details.reported_by,
          createdAt: response.data.bug_details.created_at,
        });
      } else {
        console.log("once verify the request and response");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDropdownData();
  }, []);

  const handleDropdownChange = (key, selectedOption) => {
    if (selectedOption) {
      SetBaseData((prevData) => ({
        ...prevData,
        [key]: selectedOption.label,
      }));
    }
  };

  const handleBaseDataChange = (key, value) => {
    SetBaseData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const handleSave = async () => {
    const allNotNull = Object.values(baseData).every((value) => value !== "");
    console.log(allNotNull);
    if (allNotNull === false) {
      const notificationData = {
        notification: true,
        type: "warning",
        data: "Validation error",
        message: "all fields are mandatory",
      };

      setPopUp(notificationData);
      return;
    }
    setLoading(true);
    console.log("hhhhhhh", dropdownOptions?.productOptions);
    console.log("hhj", baseData?.product);

    const payload = {
      product_id: dropdownOptions?.productOptions?.find(
        (option) => option?.label === baseData?.product
      )?.value,
      title: baseData.bugTitle,
      environment_id: dropdownOptions?.environmentOptions?.find(
        (option) => option?.label === baseData?.environment
      )?.value,
      scenario_id: dropdownOptions?.scenarioOptions?.find(
        (option) => option?.label === baseData?.scenario
      )?.value,
      testing_medium: dropdownOptions?.testingMediumOptions?.find(
        (option) => option?.label === baseData?.testingMedium
      )?.value,
      description: baseData.description,
      user_data: baseData.userData,
      priority_id: dropdownOptions?.priorityOptions?.find(
        (option) => option?.label === baseData?.priority
      )?.value,
      reported_by: dropdownOptions?.reportedByOptions?.find(
        (option) => option?.label === baseData?.reportedBy
      )?.value,
      assignee_id: 2, // Adjust this field as per your logic
      root_cause_location: dropdownOptions?.rootCauseLocationOptions?.find(
        (option) => option?.label === baseData?.rootCauseLocation
      )?.value,
      root_cause: baseData.rootCause,
      resolution: baseData.solution,
      status: dropdownOptions?.statusOptions?.find(
        (option) => option?.label === baseData?.status
      )?.value,
    };
    console.log("Payload Data:", payload);

    const response = await POSTAPI("1", payload, urls.edit_bug);
    console.log("response", response);
    if (response?.data?.status?.status === true) {
      console.log("success");
      // setLoading(false);
      const notificationData = {
        notification: true,
        type: "success",
        data: "Success",
        message: "Success full updated",
      };

      setPopUp(notificationData);
      setIsEditMode(false);
      fetchData();
    } else {
      const notificationData = {
        notification: true,
        type: "danger",
        data: "Failed",
        message: "Operation Failed",
      };

      setPopUp(notificationData);
      console.log("failed");
    }
  };
  const handleCancel = () => {
    setIsEditMode(false);
    fetchData(); // Re-fetch bug details to restore original values
  };
  console.log(popup);
  return (
    <Container fluid className="mainContainer">
      {popup?.notification === true && (
        <CreateNotificationContainer obj={popup} setPopUp={setPopUp} />
      )}

      {loading && (
        <div class="d-flex justify-content-center loading">
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
          <h4 className="space"> loading </h4>
        </div>
      )}

      {!loading && (
        <Row className="h-100">
          {/* Sidebar */}
          <Col xs={2} className="p-0">
            <SideBar />
          </Col>

          {/* Main Content */}
          <Col className="pad">
            <>
              <Row className="align-items-center mb-4">
                <Col md={6} className="d-flex align-items-center">
                  <button
                    onClick={() => navigate("/MyDashboard")}
                    className="btn p-0"
                  >
                    <img
                      src={BackArrow}
                      alt="Back"
                      className="backarrow me-2"
                    />
                  </button>
                  <h3 className="bug-details mb-0 me-4">Bug Details</h3>
                  <p className="text-secondary mb-0">{baseData.createdAt}</p>
                </Col>

                <Col md={2} className="ms-5">
                  {!isEditMode && <SmallBox child={baseData.status}></SmallBox>}
                  {isEditMode && (
                    <DropDown
                      options={dropdownOptions.statusOptions}
                      onChange={(selectedOption) =>
                        handleDropdownChange("status", selectedOption)
                      }
                      value={dropdownOptions.statusOptions.find(
                        (option) => option.value === baseData.status
                      )}
                      def={baseData.status}
                    />
                  )}
                </Col>
                <Col md={2} className="ms-5">
                  {isEditMode ? (
                    <>
                      <div className="save-cancel-bt">
                        <Button
                          className="ms-2 cancel-bt"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>

                        <Button
                          className="ms-3 save-bt"
                          onClick={handleSave} // Add save functionality here
                        >
                          Save
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button
                      className="ms-5 custom-edit-btn"
                      onClick={() => setIsEditMode(true)}
                    >
                      <img src={edit} alt="Edit" className="img-1" />
                      Edit
                    </Button>
                  )}
                </Col>
              </Row>

              {/* Bug Title */}
              <Row className="mb-5">
                <Col md={5}>
                  {!isEditMode && (
                    <div className="re">
                      <div className="t">Bug Title</div>
                      <TitleBox titl={baseData.bugTitle}></TitleBox>
                    </div>
                  )}
                  {isEditMode && (
                    <div className="re">
                      <div className="t">Bug Title</div>

                      <Form.Control
                        type="text"
                        value={baseData.bugTitle}
                        onChange={(e) =>
                          handleBaseDataChange("bugTitle", e.target.value)
                        }
                        placeholder="Bug title"
                        className="bug-title-input"
                      />
                    </div>
                  )}
                </Col>
              </Row>

              {/* Dropdowns */}
              <Row className="mb-5">
                <Col md={2}>
                  {!isEditMode && (
                    <SmallBox child={baseData.product}></SmallBox>
                  )}
                  {isEditMode && (
                    <DropDown
                      options={dropdownOptions.productOptions}
                      onChange={(selectedOption) =>
                        handleDropdownChange("product", selectedOption)
                      }
                      value={dropdownOptions.productOptions.find(
                        (option) => option.value === baseData.product
                      )}
                      def={baseData.product}
                    />
                  )}
                </Col>

                <Col md={2} className="colgap">
                  {!isEditMode && (
                    <SmallBox child={baseData.scenario}></SmallBox>
                  )}
                  {isEditMode && (
                    <DropDown
                      options={dropdownOptions.scenarioOptions}
                      onChange={(selectedOption) =>
                        handleDropdownChange("scenario", selectedOption)
                      }
                      value={dropdownOptions.scenarioOptions.find(
                        (option) => option.value === baseData.scenario
                      )}
                      def={baseData.scenario}
                    />
                  )}
                </Col>

                <Col md={2} className="colgap">
                  {!isEditMode && (
                    <SmallBox child={baseData.environment}></SmallBox>
                  )}
                  {isEditMode && (
                    <DropDown
                      options={dropdownOptions.environmentOptions}
                      onChange={(selectedOption) =>
                        handleDropdownChange("environment", selectedOption)
                      }
                      value={dropdownOptions.environmentOptions.find(
                        (option) => option.value === baseData.environment
                      )}
                      def={baseData.environment}
                    />
                  )}
                </Col>

                <Col md={2} className="colgap">
                  {!isEditMode && (
                    <SmallBox child={baseData.testingMedium}></SmallBox>
                  )}
                  {isEditMode && (
                    <DropDown
                      options={dropdownOptions.testingMediumOptions}
                      onChange={(selectedOption) =>
                        handleDropdownChange("testingMedium", selectedOption)
                      }
                      value={dropdownOptions.testingMediumOptions.find(
                        (option) => option.value === baseData.testingMedium
                      )}
                      def={baseData.testingMedium}
                    />
                  )}
                </Col>

                <Col md={2} className="colgap">
                  {!isEditMode && (
                    <SmallBox child={baseData.rootCauseLocation}></SmallBox>
                  )}
                  {isEditMode && (
                    <DropDown
                      options={dropdownOptions.rootCauseLocationOptions}
                      onChange={(selectedOption) =>
                        handleDropdownChange(
                          "rootCauseLocation",
                          selectedOption
                        )
                      }
                      value={dropdownOptions.rootCauseLocationOptions.find(
                        (option) => option.value === baseData.rootCauseLocation
                      )}
                      def={baseData.rootCauseLocation}
                    />
                  )}
                </Col>
              </Row>
              <Row className="mb-5">
                <Col md={2}>
                  {!isEditMode && (
                    <SmallBox child={baseData.priority}></SmallBox>
                  )}
                  {isEditMode && (
                    <DropDown
                      options={dropdownOptions.priorityOptions}
                      onChange={(selectedOption) =>
                        handleDropdownChange("priority", selectedOption)
                      }
                      value={dropdownOptions.priorityOptions.find(
                        (option) => option.value === baseData.priority
                      )}
                      def={baseData.priority}
                    />
                  )}
                </Col>

                <Col md={2} className="colgap">
                  {!isEditMode && (
                    <SmallBox child={baseData.reportedBy}></SmallBox>
                  )}
                  {isEditMode && (
                    <DropDown
                      options={dropdownOptions.reportedByOptions}
                      onChange={(selectedOption) =>
                        handleDropdownChange("reportedBy", selectedOption)
                      }
                      value={dropdownOptions.reportedByOptions.find(
                        (option) => option.value === baseData.reportedBy
                      )}
                      def={baseData.reportedBy}
                    />
                  )}
                </Col>
              </Row>

              {/* Details Sections */}
              <Row className="mb-5">
                <Col md={6}>
                  {!isEditMode && (
                    <FixedBox
                      title={"Description"}
                      content={baseData.description}
                    ></FixedBox>
                  )}
                  {isEditMode && (
                    <Box>
                      <h5>Description</h5>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={baseData.description}
                        onChange={(e) =>
                          handleBaseDataChange("description", e.target.value)
                        }
                        placeholder="Enter description here"
                        className="box-textarea"
                      />
                    </Box>
                  )}
                </Col>
                <Col md={6}>
                  {!isEditMode && (
                    <FixedBox
                      title={"User Data"}
                      content={baseData.userData}
                    ></FixedBox>
                  )}
                  {isEditMode && (
                    <Box>
                      <h5>User Data</h5>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={baseData.userData}
                        onChange={(e) =>
                          handleBaseDataChange("userData", e.target.value)
                        }
                        placeholder="Enter user data here"
                        className="box-textarea"
                      />
                    </Box>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  {!isEditMode && (
                    <FixedBox
                      title={"Root Cause"}
                      content={baseData.rootCause}
                    ></FixedBox>
                  )}
                  {isEditMode && (
                    <Box>
                      <h5>Root Cause</h5>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={baseData.rootCause}
                        onChange={(e) =>
                          handleBaseDataChange("rootCause", e.target.value)
                        }
                        placeholder="Enter root cause here"
                        className="box-textarea"
                      />
                    </Box>
                  )}
                </Col>
                <Col md={6}>
                  {!isEditMode && (
                    <FixedBox
                      title={"Solution"}
                      content={baseData.solution}
                    ></FixedBox>
                  )}
                  {isEditMode && (
                    <Box>
                      <h5>Solution</h5>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={baseData.solution}
                        onChange={(e) =>
                          handleBaseDataChange("solution", e.target.value)
                        }
                        placeholder="Enter solution here"
                        className="box-textarea"
                      />
                    </Box>
                  )}
                </Col>
              </Row>

              {/* Comments Section */}
              <Row className="mt-4">
                <h5>Comments</h5>
                <Form.Control type="text" placeholder="Add a Comment..." />
              </Row>
            </>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default EditBug;
