import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBugs } from "../store/bugListActions";
import Bug from "./Bug";
import "./BugsList.css";

const BugList = ({ filters }) => {
  const dispatch = useDispatch();
  const bugList = useSelector((state) => state.bugList) || {};
  const { loading = false, bugs = [], error = "" } = bugList;
  const [filteredBugs, setFilteredBugs] = useState([]);

  useEffect(() => {
    dispatch(fetchBugs());
  }, [dispatch]);

  useEffect(() => {
    console.log("Filters applied:", filters);
    console.log("All Bugs Before Filtering:", bugs);

    if (!filters || Object.values(filters).every((val) => !val)) {
      setFilteredBugs(bugs);
      return;
    }

    const updatedFilteredBugs = bugs.filter((bug) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true; // Ignore empty filters

        const bugValue = bug[key]?.toString().toLowerCase().trim() || "";
        const filterValue = value.toString().toLowerCase().trim();

        return bugValue === filterValue;
      })
    );

    console.log("Filtered Bugs:", updatedFilteredBugs);
    setFilteredBugs(updatedFilteredBugs);
  }, [filters, bugs]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">Error: {error}</div>;

  return (
    <div className="bug-list-container">
      <Table hover>
        <thead>
          <tr>
            <th>Bug</th>
            <th>Scenario</th>
            <th>Status</th>
            <th>Assignee</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredBugs.length > 0 ? (
            filteredBugs.map((bug) => <Bug key={bug.bug_id} indbug={bug} />)
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No bugs found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BugList;
