import React, { useState, useEffect } from "react";
import "./ApplyFilter.css";

const ApplyFilter = ({ isOpen, onClose, onApply }) => {
  const [filters, setFilters] = useState({
    reportedBy: "",
    product: "",
    environment: "",
    testingMedium: "",
    scenario: "",
    priority: "",
    status: "",
    assignee: "",
    rootCauseLocation: "",
  });

  const [dropdownData, setDropdownData] = useState({
    reportedBy: [],
    products: [],
    environments: [],
    testingMediums: [],
    scenarios: [],
    priorities: [],
    statuses: [],
    assignees: [],
    rootCauseLocations: [],
  });

  // Fetch filter data
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const tableDataRes = await fetch(
          "https://xjhkkap5tmpwr3yjiw7nvadwra0jyiav.lambda-url.us-east-1.on.aws/fetch-table-data"
        );
        const userDataRes = await fetch(
          "https://xjhkkap5tmpwr3yjiw7nvadwra0jyiav.lambda-url.us-east-1.on.aws/get-user-details"
        );

        const tableData = await tableDataRes.json();
        const userData = await userDataRes.json();

        setDropdownData({
          reportedBy: userData.users || [],
          products: tableData.products || [],
          environments: tableData.environments || [],
          testingMediums: tableData.testing_medium || [],
          scenarios: tableData.scenarios || [],
          priorities: tableData.priority || [],
          statuses: tableData.bug_status || [],
          assignees: userData.users || [],
          rootCauseLocations: tableData.root_cause_location || [],
        });
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    if (isOpen) {
      fetchDropdownData();
    }
  }, [isOpen]);

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Apply filters
  const applyFilters = () => {
    onApply(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="filter-popup">
      <div className="filter-container">
        <div className="filter-header">
          <h3>Filters</h3>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="filter-grid">
          {Object.keys(filters).map((key) => (
            <select key={key} name={key} value={filters[key]} onChange={handleFilterChange}>
              <option value="">{key.replace(/([A-Z])/g, " $1")}</option>
              {dropdownData[key]?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name || item.status_name}
                </option>
              ))}
            </select>
          ))}
        </div>

        <button className="apply-btn" onClick={applyFilters}>Apply</button>
      </div>
    </div>
  );
};

export default ApplyFilter;
