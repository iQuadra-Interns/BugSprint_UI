import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import "./ApplyFilter.css";

const ApplyFilter = ({ showFilterModal, setShowFilterModal, applyFilters, dropdownData }) => {
  const [filterData, setFilterData] = useState({
    bug_status: "",
    environment: "",
    priority: "",
    product: "",
    root_cause_location: "",
    scenario: "",
    assignee: "",
    testing_medium: "",
    reported_by: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedFilters = {};
    Object.entries(filterData).forEach(([key, value]) => {
      if (value !== "") {
        formattedFilters[key] = value;
      }
    });

    console.log("Filters sent to BugList:", formattedFilters);
    applyFilters(formattedFilters);
    setShowFilterModal(false);
    toast.success("Filters applied successfully!");
  };

  const handleCancel = () => {
    setFilterData({
      bug_status: "",
      environment: "",
      priority: "",
      product: "",
      root_cause_location: "",
      scenario: "",
      assignee: "",
      testing_medium: "",
      reported_by: "",
    });
    setShowFilterModal(false);
  };

  return (
    <div className={`apply-filter-modal ${showFilterModal ? "show" : ""}`}>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="apply-filter-container">
        <h2 className="title">Apply Filters</h2>
        <form onSubmit={handleSubmit} className="apply-filter-form">
          <div className="form-row">
            <select name="reported_by" value={filterData.reported_by} onChange={handleChange}>
              <option value="">Reported by</option>
              {dropdownData.reportedBy.map(user => (
                <option key={user.user_id} value={user.user_name}>{user.user_name}</option>
              ))}
            </select>
            <select name="product" value={filterData.product} onChange={handleChange}>
              <option value="">Product</option>
              {dropdownData.products.map(product => (
                <option key={product.product_id} value={product.product_name}>{product.product_name}</option>
              ))}
            </select>
            <select name="environment" value={filterData.environment} onChange={handleChange}>
              <option value="">Environment</option>
              {dropdownData.environments.map(environment => (
                <option key={environment.environment_id} value={environment.environment_name}>{environment.environment_name}</option>
              ))}
            </select>
            <select name="testing_medium" value={filterData.testing_medium} onChange={handleChange}>
              <option value="">Testing Medium</option>
              {dropdownData.testingMediums.map(medium => (
                <option key={medium.medium_id} value={medium.medium_name}>{medium.medium_name}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <select name="scenario" value={filterData.scenario} onChange={handleChange}>
              <option value="">Scenario</option>
              {dropdownData.scenarios.map(scenario => (
                <option key={scenario.scenario_id} value={scenario.scenario_name}>{scenario.scenario_name}</option>
              ))}
            </select>
            <select name="priority" value={filterData.priority} onChange={handleChange}>
              <option value="">Priority</option>
              {dropdownData.priorities.map(priority => (
                <option key={priority.priority_id} value={priority.priority_name}>{priority.priority_name}</option>
              ))}
            </select>
            <select name="status" value={filterData.bug_status} onChange={handleChange}>
              <option value="">Status</option>
              {dropdownData.bugStatus.map(status => (
                <option key={status.status_id} value={status.status_name}>{status.status_name}</option>
              ))}
            </select>
            <select name="assignee" value={filterData.assignee} onChange={handleChange}>
              <option value="">Assignee</option>
              {dropdownData.assignees.map(assignee => (
                <option key={assignee.user_id} value={assignee.user_name}>{assignee.user_name}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <select name="root_cause_location" value={filterData.root_cause_location} onChange={handleChange}>
              <option value="">Root Cause Location</option>
              {dropdownData.rootCauseLocations.map(location => (
                <option key={location.location_id} value={location.location_name}>{location.location_name}</option>
              ))}
            </select>
          </div>
          <div className="button-group">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="apply-button">
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyFilter;
