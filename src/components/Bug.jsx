import React from 'react';
import { Badge} from 'react-bootstrap';

export default function Bug({indbug}) {

    const getStatusBadge = (status) => {
        const statusColors = {
          Open: 'danger',
          Wip: 'warning',
          Fixed: 'success',
          Closed: 'success',
          Deferred: 'info',
          Rejected: 'secondary',
          Medium: 'warning',
          Low: 'info',
          High: 'danger'
        };
        return <Badge bg={statusColors[status]}>{status}</Badge>;
      };

    const getStatusColor = (status) => {
        const statusColors = {
          Open: '#dc3545',
          Wip: '#ffc107',
          Fixed: '#28a745',
          Closed: '#28a745',
          Deferred: '#17a2b8',
          Rejected: '#6c757d',
          Medium: '#ffc107',
          Low: '#17a2b8',
          High: '#dc3545'
        };
        return statusColors[status] || '#6c757d'; // Default color if status is not found
      };

    return (
        <tr key={indbug.id}>
            <td style={{ display: 'flex', alignItems: 'center' }}>
              <div 
                style={{
                width: '4px',
                height: '50px',
                backgroundColor: getStatusColor(indbug.status),
                marginRight: '10px'
              }}
              />
              <div>
                <div>{indbug.id}</div>
                <div>{indbug.description}</div>
              </div>
            </td>
            <td>{indbug.scenario}</td>
            <td>{getStatusBadge(indbug.status)}</td>
            <td>
              <Badge bg="secondary" pill>{indbug.assignee}</Badge>
            </td>
          </tr>
    )

}