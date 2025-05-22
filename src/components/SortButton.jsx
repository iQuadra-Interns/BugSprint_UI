import { Form, Dropdown } from 'react-bootstrap';
import {ArrowUpDown} from 'lucide-react';

export default function SortButton() {

    return (
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" className="me-2">
            <ArrowUpDown size={18} className="me-2" />
            Sort 
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Header>
              Sort by
            </Dropdown.Header>
            <Dropdown.Item>Priority</Dropdown.Item>
            <Dropdown.ItemText>
              <Form.Check
                type="radio"
                id="sort-highest-lowest"
                label="Highest to Lowest"
                name="sortPriority"
                defaultChecked
              />
              <Form.Check
                type="radio"
                id="sort-lowest-highest"
                label="Lowest to Highest"
                name="sortPriority"
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
              />
              <Form.Check
                type="radio"
                id="sort-newest-oldest"
                label="Newest to Oldest"
                name="sortDate"
              />
            </Dropdown.ItemText>
          </Dropdown.Menu>
         </Dropdown>
    )

}