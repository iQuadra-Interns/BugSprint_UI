import React from 'react';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Bug({ indbug }) {
  const navigate = useNavigate(); // Correct usage of useNavigate

  const unq = indbug.bug_code;

  // Function to handle the click event on <tr>
  const handleRowClick = (id) => {
    sessionStorage.setItem("bugId", id); // Store bugId in sessionStorage
    window.open(`/bug/${unq}`, "_blank"); // Open in a new tab
  };

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
    return statusColors[status] || '#CECECE'; // Default gray
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
    const statusColors = {
      Open: 'danger',    // Red
      WIP: 'warning',    // Orange
      Fixed: 'success',  // Green
      Closed: 'success', // Dark Green
      Deferred: 'info',  // Yellow
      Rejected: 'secondary' // Dark Gray
    };
    return <Badge bg={statusColors[status]}>{status}</Badge>;
  };

  // Construct the profile picture path 
  const profilePicturePath = `/images/${indbug.assignee.toLowerCase().replace(' ', '-')}.jpg`;

  // Function to check if the image exists 
  const imageExists = (url) => {
    return true;
  };

  // Fallback for tooltip content
  const tooltipContent = indbug.assignee || 'Unknown Assignee';

  return (
    <tr onClick={() => handleRowClick(indbug.bug_id)} key={indbug.bug_id}>
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
        <div className="avatar-circle">
          {imageExists(profilePicturePath) ? (
            <img
              src={profilePicturePath}
              alt={indbug.assignee}
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <span
            style={{
              display: imageExists(profilePicturePath) ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}
          >
            {indbug.assignee
              ? indbug.assignee
                  .split(' ')
                  .map((name) => name[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()
              : '??'}
          </span>
          <span className="tooltip">{tooltipContent}</span>
        </div>
      </td>
    </tr>
  );
}