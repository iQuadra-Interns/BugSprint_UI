import React from 'react';
import { Badge } from 'react-bootstrap';

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

    return (
        <tr key={indbug.id}>
            <td>
              <div>{indbug.id}</div>
              <div>{indbug.description}</div>
            </td>
            <td>{indbug.scenario}</td>
            <td>{getStatusBadge(indbug.status)}</td>
            <td>
              <Badge bg="secondary" pill>{indbug.assignee}</Badge>
            </td>
          </tr>
    )

}