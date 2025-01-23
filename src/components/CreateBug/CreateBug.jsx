import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import LoadingScreen from "../LoadingScreen/LoadingScreen"; // Correct path to import loading screen
import "./CreateBug.css";

const CreateBug = () => {
  const [bugData, setBugData] = useState({
    product_id: 0,
    title: "",
    environment_id: 0,
    scenario_id: 0,
    testing_medium: 0,
    description: "",
    user_data: "",
    priority_id: 0,
    reported_by: 0,
    assignee_id: 0,
    root_cause_location: 0,
    root_cause: "",
    resolution: "",
    status: 0,
  });

  const [dropdownData, setDropdownData] = useState({
    bugStatus: [],
    environments: [],
    products: [],
    rootCauseLocations: [],
    scenarios: [],
    testingMediums: [],
    priorities: [],
    assignees: [],
  });

  const [filteredScenarios, setFilteredScenarios] = useState([]);
  const [loading, setLoading] = useState(false); // State for Loading Screen

  // Fetch dropdown data from common constants URL
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        "https://xjhkkap5tmpwr3yjiw7nvadwra0jyiav.lambda-url.us-east-1.on.aws/fetch-table-data",
        { table_name: "string" },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        setDropdownData((prev) => ({
          ...prev,
          bugStatus: response.data.data.bug_status,
          environments: response.data.data.environments,
          products: response.data.data.products,
          rootCauseLocations: response.data.data.root_cause_location,
          scenarios: response.data.data.scenarios,
          testingMediums: response.data.data.testing_medium,
          priorities: response.data.data.priority,
        }));
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching dropdown data");
        console.error("Error fetching dropdown data:", error);
        setLoading(false);
      });

    // Fetch assignees
    axios
      .get("https://xjhkkap5tmpwr3yjiw7nvadwra0jyiav.lambda-url.us-east-1.on.aws/get-user-details")
      .then((response) => {
        setDropdownData((prev) => ({
          ...prev,
          assignees: response.data.users,
        }));
      })
      .catch((error) => {
        toast.error("Error fetching assignees");
        console.error("Error fetching assignees:", error);
      });
  }, []);

  // Filter scenarios based on selected product
  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    setBugData({ ...bugData, product_id: selectedProductId, scenario_id: "" });

    if (dropdownData.scenarios && Array.isArray(dropdownData.scenarios)) {
      const filtered = dropdownData.scenarios.filter(
        (scenario) => scenario.product_id.toString() === selectedProductId
      );
      setFilteredScenarios(filtered);
    }
  };

  // Handle other input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBugData({ ...bugData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!bugData.product_id || !bugData.description || !bugData.title || !bugData.priority_id || !bugData.assignee_id) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setLoading(true); // Show loading screen during submission

    // Convert data to correct types and add default values for optional fields
    const formattedBugData = {
      ...bugData,
      product_id: parseInt(bugData.product_id, 10),
      environment_id: parseInt(bugData.environment_id, 10),
      scenario_id: parseInt(bugData.scenario_id, 10),
      testing_medium: parseInt(bugData.testing_medium, 10),
      priority_id: parseInt(bugData.priority_id, 10),
      assignee_id: parseInt(bugData.assignee_id, 10),
      root_cause_location: parseInt(bugData.root_cause_location, 10),
      status: parseInt(bugData.status, 10),
      resolution: bugData.resolution || "Not Provided", // Default value for optional fields
      root_cause: bugData.root_cause || "Not Provided", // Default value for optional fields
      reported_by: bugData.reported_by || 1, // Set to the current user ID (if applicable)
    };

    // Submit data to the API
    axios
      .post(
        "https://esayaabfpizs3huhtuo6hevhia0parjp.lambda-url.us-east-1.on.aws/api/add-bug",
        formattedBugData,
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        toast.success("Bug saved successfully!");
        console.log("Bug added successfully:", response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to save the bug. Please try again.");
        console.error("Error adding bug:", error.response?.data || error);
        setLoading(false);
      });
  };

  return (
    <div className="create-bug-container">
      {loading && <LoadingScreen />} {/* Show loading screen if loading */}
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="title">Create Bug</h2>
      <form onSubmit={handleSubmit} className="create-bug-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Bug Title"
            name="title"
            value={bugData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <select name="product_id" value={bugData.product_id} onChange={handleProductChange} required>
            <option value="">Product Name</option>
            {dropdownData.products.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_name}
              </option>
            ))}
          </select>

          <select name="scenario_id" value={bugData.scenario_id} onChange={handleChange} disabled={!filteredScenarios.length}>
            <option value="">Scenario</option>
            {filteredScenarios.map((scenario) => (
              <option key={scenario.scenario_id} value={scenario.scenario_id}>
                {scenario.scenario_name}
              </option>
            ))}
          </select>

          <select name="environment_id" value={bugData.environment_id} onChange={handleChange}>
            <option value="">Environment</option>
            {dropdownData.environments.map((environment) => (
              <option key={environment.environment_id} value={environment.environment_id}>
                {environment.environment_name}
              </option>
            ))}
          </select>

          <select name="testing_medium" value={bugData.testing_medium} onChange={handleChange}>
            <option value="">Testing Medium</option>
            {dropdownData.testingMediums.map((medium) => (
              <option key={medium.medium_id} value={medium.medium_id}>
                {medium.medium_name}
              </option>
            ))}
          </select>

          <select name="root_cause_location" value={bugData.root_cause_location} onChange={handleChange}>
            <option value="">Root Cause Location</option>
            {dropdownData.rootCauseLocations.map((location) => (
              <option key={location.location_id} value={location.location_id}>
                {location.location_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <select name="priority_id" value={bugData.priority_id} onChange={handleChange} required>
            <option value="">Priority</option>
            {dropdownData.priorities.map((priority) => (
              <option key={priority.priority_id} value={priority.priority_id}>
                {priority.priority_name}
              </option>
            ))}
          </select>

          <select name="status" value={bugData.status} onChange={handleChange} required>
            <option value="">Status</option>
            {dropdownData.bugStatus.map((status) => (
              <option key={status.status_id} value={status.status_id}>
                {status.status_name}
              </option>
            ))}
          </select>

          <select name="assignee_id" value={bugData.assignee_id} onChange={handleChange} required>
            <option value="">Assignee</option>
            {dropdownData.assignees.map((assignee) => (
              <option key={assignee.user_id} value={assignee.user_id}>
                {assignee.user_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <textarea
            placeholder="Bug Description"
            name="description"
            value={bugData.description}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder="User Data (optional)"
            name="user_data"
            value={bugData.user_data}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default CreateBug;
