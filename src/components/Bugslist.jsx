import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Bug from './Bug';
import axios from 'axios';
//import './BugsList.css';

const BugList = () => {
  const [loading, setLoading] = useState(true);
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await axios.post('https://v3dfk4mm6zkwbehcs5c6cvauae0yzksa.lambda-url.us-east-1.on.aws/bugs_list');
        setBugs(response.data.bugs);  // Adjusted for the new response structure
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bug data');
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <Table hover >
      
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
        {Array.isArray(bugs) && bugs.map((bug) => (
          <Bug key={bug.bug_id} indbug={bug} />

        ))}
      </tbody>
      
    </Table>
  );
};

export default BugList;
