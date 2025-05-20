import React from "react";
import "./TestCasesList.css";

const TestCasesList = ({ testcases }) => {
  return (
    <div className="testcase-list-wrapper">
      {/* Header Row */}
      <div className="testcase-header-row">
        <div className="testcase-header" style={{ flex: 2 }}>Scenario</div>
        <div className="testcase-header" style={{ flex: 3 }}>Steps</div>
        <div className="testcase-header" style={{ flex: 1 }}>Result</div>
      </div>

      {/* Data Rows */}
      {testcases.map((test, index) => (
        <div key={index} className="testcase-row">
          <div className="testcase-title">{test.test_scenario}</div>
          <div className="testcase-scenario">{test.test_steps}</div>
          <div
            className={`testcase-result ${
              test.actual_result === test.expected_result ? "pass" : "fail"
            }`}
          >
            {test.actual_result === test.expected_result ? "Pass" : "Fail"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestCasesList;
