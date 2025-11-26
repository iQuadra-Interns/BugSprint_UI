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
              {(dropdownData?.reportedBy || [])
                .filter(user => user && user.user_name && user.user_name.toString().trim())
                .map(user => {
                  const name = user.user_name.toString().trim();
                  return (
                    <option key={user.user_id} value={name}>{name}</option>
                  );
                })}
            </select>
            <select name="product" value={filterData.product} onChange={handleChange}>
              <option value="">Product</option>
              {(dropdownData?.products || [])
                .filter(p => p && p.product_name && p.product_name.toString().trim())
                .map(product => {
                  const name = product.product_name.toString().trim();
                  return <option key={product.product_id} value={name}>{name}</option>;
                })}
            </select>
            <select name="environment" value={filterData.environment} onChange={handleChange}>
              <option value="">Environment</option>
              {(dropdownData?.environments || [])
                .filter(env => env && env.environment_name && env.environment_name.toString().trim())
                .map(environment => {
                  const name = environment.environment_name.toString().trim();
                  return <option key={environment.environment_id} value={name}>{name}</option>;
                })}
            </select>
            <select name="testing_medium" value={filterData.testing_medium} onChange={handleChange}>
              <option value="">Testing Medium</option>
              {(dropdownData?.testingMediums || [])
                .filter(m => m && m.medium_name && m.medium_name.toString().trim())
                .map(medium => {
                  const name = medium.medium_name.toString().trim();
                  return <option key={medium.medium_id} value={name}>{name}</option>;
                })}
            </select>
          </div>

          <div className="form-row">
            <select name="scenario" value={filterData.scenario} onChange={handleChange}>
              <option value="">Scenario</option>
              {(dropdownData?.scenarios || [])
                .filter(s => s && s.scenario_name && s.scenario_name.toString().trim())
                .map(scenario => {
                  const name = scenario.scenario_name.toString().trim();
                  return <option key={scenario.scenario_id} value={name}>{name}</option>;
                })}
            </select>
            <select name="priority" value={filterData.priority} onChange={handleChange}>
              <option value="">Priority</option>
              {(dropdownData?.priorities || [])
                .filter(p => p && p.priority_name && p.priority_name.toString().trim())
                .map(priority => {
                  const name = priority.priority_name.toString().trim();
                  return <option key={priority.priority_id} value={name}>{name}</option>;
                })}
            </select>
            <select name="bug_status" value={filterData.bug_status} onChange={handleChange}>
              <option value="">Status</option>
              {(dropdownData?.bugStatus || [])
                .filter(s => s && s.status_name && s.status_name.toString().trim())
                .map(status => {
                  const name = status.status_name.toString().trim();
                  return <option key={status.status_id} value={name}>{name}</option>;
                })}
            </select>
            <select name="assignee" value={filterData.assignee} onChange={handleChange}>
              <option value="">Assignee</option>
              {(dropdownData?.assignees || [])
                .filter(a => a && a.user_name && a.user_name.toString().trim())
                .map(assignee => {
                  const name = assignee.user_name.toString().trim();
                  return <option key={assignee.user_id} value={name}>{name}</option>;
                })}
            </select>
          </div>

          <div className="form-row">
            <select name="root_cause_location" className="full-width" value={filterData.root_cause_location} onChange={handleChange}>
              <option value="">Root Cause Location</option>
              {(dropdownData?.rootCauseLocations || [])
                .filter(loc => loc && loc.location_name && loc.location_name.toString().trim())
                .map(location => {
                  const name = location.location_name.toString().trim();
                  return <option key={location.location_id} value={name}>{name}</option>;
                })}
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
