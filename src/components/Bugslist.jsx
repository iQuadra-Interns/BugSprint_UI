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

    const updatedFilteredBugs = bugs.filter((bug) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value || key?.toString().startsWith("sort")) return true;

        const filterValue = value.toString().toLowerCase().trim();

        if (key === "search") {
          const haystack = [
            bug.description,
            bug.scenario,
            bug.assignee,
            bug.bug_code,
            bug.bug_id,
            bug.title,
            bug.product,
          ]
            .filter(Boolean)
            .join(" ")
            .toString()
            .toLowerCase();

          return haystack.includes(filterValue);
        }

        const bugValue = bug[key]?.toString().toLowerCase().trim() || "";
        return bugValue === filterValue;
      });
    });

    const sortedBugs = [...updatedFilteredBugs];

    const priorityWeight = (p) => {
      if (p === null || p === undefined) return 0;
      const s = p.toString().toLowerCase().trim();

      const map = { critical: 5, highest: 4, high: 4, medium: 3, med: 3, low: 2, lowest: 1 };
      for (const key of Object.keys(map)) if (s.includes(key)) return map[key];

      const m = s.match(/\d+/);
      if (m) {
        const num = Number(m[0]);
        if (!Number.isNaN(num)) return Math.max(0, 100 - num); 
      }

      return s.charCodeAt(0) || 0;
    };

    if (filters.sortPriority) {
      if (filters.sortPriority === "high-low") {
        sortedBugs.sort((a, b) => priorityWeight(b.priority) - priorityWeight(a.priority));
      } else if (filters.sortPriority === "low-high") {
        sortedBugs.sort((a, b) => priorityWeight(a.priority) - priorityWeight(b.priority));
      }
    }

    const dateValue = (bug) => {
      const d = bug.createdAt || bug.created_at || bug.created || bug.reported_date || bug.date_reported;
      const parsed = Date.parse(d);
      return Number.isNaN(parsed) ? 0 : parsed;
    };

    if (filters.sortDate) {
      if (filters.sortDate === "oldest-newest") {
        sortedBugs.sort((a, b) => dateValue(a) - dateValue(b));
      } else if (filters.sortDate === "newest-oldest") {
        sortedBugs.sort((a, b) => dateValue(b) - dateValue(a));
      }
    }

    console.log("Filtered Bugs:", sortedBugs);
    setFilteredBugs(sortedBugs);
  }, [filters, bugs]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">Error: {error}</div>;

  return (
    <div className="bug-list-container">
      <Table hover className="bug-table">
        <thead>
          <tr>
            <th>Bug</th>
            <th>Scenario</th>
            <th>Status</th>
            <th>Assignee</th>
            <th className="d-none d-lg-table-cell"></th>
          </tr>
        </thead>
        <tbody>
          {filteredBugs.length > 0 ? (
            filteredBugs.map((bug) => <Bug key={bug.bug_id} indbug={bug} />)
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No results found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BugList;