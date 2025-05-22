import React from 'react';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Bug({ indbug }) {
  const navigate = useNavigate();

  const unq = indbug.bug_code;

  const handleRowClick = (id) => {
    sessionStorage.setItem("bugId", id);
    window.open(`/bug/${unq}`, "_blank");
  };

  const getStatusColor = (status) => {
    const statusColors = {
      Open: '#ff4d4f',
      WIP: '#ffa940',
      Fixed: '#52c41a',
      Closed: '#0e4d05',
      Deferred: '#eded42',
      Rejected: '#4a4a46'
    };
    return statusColors[status] || '#CECECE';
  };

  const getPriorityColor = (priority) => {
    const priorityColors = {
      Feature: '#9370DB',
      Low: '#28a745',
      High: '#dc3545',
      Critical: '#000000'
    };
    return priorityColors[priority] || '#6c757d';
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      Open: 'danger',
      WIP: 'warning',
      Fixed: 'success',
      Closed: 'success',
      Deferred: 'info',
      Rejected: 'secondary'
    };
    return <Badge bg={statusColors[status]}>{status}</Badge>;
  };

  const profilePicturePath = `/images/${indbug.assignee.toLowerCase().replace(' ', '-')}.jpg`;

  const imageExists = (url) => {
    return true;
  };

  const tooltipContent = indbug.assignee || 'Unknown Assignee';

  const stringToColor = (string) => {
    if (!string) return '#e5e7eb';

    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    const hexColor = '#' + '00000'.substring(0, 6 - color.length) + color;

    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    let brightness = (r * 299 + g * 587 + b * 114) / 1000;

    if (brightness < 60) {
      const factor = 1.8;
      const newR = Math.min(255, Math.floor(r * factor)).toString(16).padStart(2, '0');
      const newG = Math.min(255, Math.floor(g * factor)).toString(16).padStart(2, '0');
      const newB = Math.min(255, Math.floor(b * factor)).toString(16).padStart(2, '0');
      return `#${newR}${newG}${newB}`;
    } else if (brightness > 90) {
      const factor = 0.65;
      const newR = Math.floor(r * factor).toString(16).padStart(2, '0');
      const newG = Math.floor(g * factor).toString(16).padStart(2, '0');
      const newB = Math.floor(b * factor).toString(16).padStart(2, '0');
      return `#${newR}${newG}${newB}`;
    }

    return hexColor;
  };

  const shouldShowImage = imageExists(profilePicturePath);

  const avatarBackgroundColor = shouldShowImage ? 'transparent' : stringToColor(indbug.assignee);

  return (
    <tr onClick={() => handleRowClick(indbug.bug_id)} key={indbug.bug_id} className="bug-row">
      <td className="bug-column">
        <div className="priority-bar" style={{ width: '4px', height: '50px', backgroundColor: getPriorityColor(indbug.priority) }} />
        <div className="bug-details">
          <div className="bug-id">{indbug.id}</div>
          <div className="bug-description">{indbug.description}</div>
        </div>
      </td>
      <td className="scenario-column">{indbug.scenario}</td>
      <td className="status-column">{getStatusBadge(indbug.status)}</td>
      <td className="assignee-column">
        <div className="avatar-circle" style={{ backgroundColor: avatarBackgroundColor }}>
          {shouldShowImage ? (
            <img
              src={profilePicturePath}
              alt={indbug.assignee}
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
                e.target.parentElement.style.backgroundColor = stringToColor(indbug.assignee);
              }}
            />
          ) : null}
          <span
            style={{
              display: shouldShowImage ? 'none' : 'flex',
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
      <td className="d-none d-lg-table-cell"></td>
    </tr>
  );
}