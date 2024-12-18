import React from 'react';
import { Badge } from 'react-bootstrap';

export default function Bug({ indbug }) {
  // Maps for status and priority colors
  const getStatusColor = (status) => {
    const statusColors = {
      Open: '#ff4d4f',    // Red
      WIP: '#ffa940',     // Orange
      Fixed: '#52c41a',   // Green
      Closed: '#0e4d05',  // Dark Green
      Deferred: '#eded42',// Yellow
      Rejected: '#4a4a46' // Dark Gray
    };
    return statusColors[status] || '##CECECE'; // Default gray #6c757d
  };

  const getPriorityColor = (priority) => {
    const priorityColors = {
      Feature: '#9370DB',  // Lavender
      Low: '#28a745',      // Green
      High: '#dc3545',     // Red
      Critical: '#000000'  // Black
    };
    return priorityColors[priority] || '#6c757d'; // Default gray
  };

  const getStatusBadge = (status) => {
    console.log("Status fetched:", status); 
    const statusColors = {
      Open: 'danger',    // Red
      WIP: 'warning',    // Orange
      Fixed: 'success',  // Green
      Closed: 'success', // Dark Green
      Deferred: 'info',  // Yellow
      Rejected: 'secondary' //Dark Gray
    };
    return <Badge bg={statusColors[status]}>{status}</Badge>;
  };

  return (
    <tr key={indbug.id}>
      {/* Bug description column */}
      <td style={{ display: 'flex', alignItems: 'center' }}>
        {/* Vertical section for priority */}
        <div
          style={{
            width: '4px',
            height: '50px',
            backgroundColor: getPriorityColor(indbug.priority), // Priority color
            marginRight: '10px'
          }}
        />
        {/* Bug details */}
        <div>
          <div>{indbug.id}</div>
          <div>{indbug.description}</div>
        </div>
      </td>

      {/* Scenario column */}
      <td>{indbug.scenario}</td>

      {/* Status column with colored badge */}
      
      <td>
        {getStatusBadge(indbug.status)}
      </td>

      {/* Assignee column */}
      <td>
        <Badge bg="secondary" pill style={{ fontSize: '1.25rem', padding: '0.5rem 1rem' }}>
          {indbug.assignee}
        </Badge>
      </td>
    </tr>
  );
}
