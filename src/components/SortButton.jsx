import { Form, Dropdown } from 'react-bootstrap';
import {ArrowUpDown} from 'lucide-react';

export default function SortButton({ applyFilters }) {

  const handlePriorityChange = (e) => {
    const id = e.target.id;
    if (id === "sort-highest-lowest") applyFilters({ sortPriority: "high-low", sortDate: null });
    else if (id === "sort-lowest-highest") applyFilters({ sortPriority: "low-high", sortDate: null });
  };

  const handleDateChange = (e) => {
    const id = e.target.id;
    if (id === "sort-oldest-newest") applyFilters({ sortDate: "oldest-newest", sortPriority: null });
    else if (id === "sort-newest-oldest") applyFilters({ sortDate: "newest-oldest", sortPriority: null });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" className="me-2">
        <ArrowUpDown size={18} className="me-2" />
        Sort
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Header>Sort by</Dropdown.Header>
        <Dropdown.Item>Priority</Dropdown.Item>
        <Dropdown.ItemText>
          <Form.Check
            type="radio"
            id="sort-highest-lowest"
            label="Highest to Lowest"
            name="sortPriority"
            defaultChecked
            onChange={handlePriorityChange}
          />
          <Form.Check
            type="radio"
            id="sort-lowest-highest"
            label="Lowest to Highest"
            name="sortPriority"
            onChange={handlePriorityChange}
          />
        </Dropdown.ItemText>
        <Dropdown.Item>Date</Dropdown.Item>
        <Dropdown.ItemText>
          <Form.Check
            type="radio"
            id="sort-oldest-newest"
            label="Oldest to Newest"
            name="sortDate"
            defaultChecked
            onChange={handleDateChange}
          />
          <Form.Check
            type="radio"
            id="sort-newest-oldest"
            label="Newest to Oldest"
            name="sortDate"
            onChange={handleDateChange}
          />
        </Dropdown.ItemText>
      </Dropdown.Menu>
    </Dropdown>
  );

}