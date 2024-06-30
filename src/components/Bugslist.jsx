import React from 'react';
import { Table, Badge } from 'react-bootstrap';

const BugList = () => {
  // This would typically come from a state or props
  const bugs = [
    { id: 'IQUA-1', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Open', assignee: 'KM' },
    { id: 'IQUA-14', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Wip', assignee: 'AJ' },
    { id: 'TBG-69', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Fixed', assignee: 'profile_pic' },
    { id: 'IQUA-777', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Closed', assignee: 'profile_pic' },
    { id: 'ADT-900', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Deferred', assignee: 'profile_pic' },
    { id: 'IQBS-001', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Rejected', assignee: 'KM' },
    { id: 'IQBS-001', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Medium', assignee: 'profile_pic' },
    { id: 'IQBS-001', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Low', assignee: 'HB' },
    { id: 'IQBS-001', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'High', assignee: 'AJ' },
  ];

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
    <Table hover>
      <thead>
        <tr>
          <th>Bug</th>
          <th>Scenario</th>
          <th>Status</th>
          <th>Assignee</th>
        </tr>
      </thead>
      <tbody>
        {bugs.map((bug) => (
          <tr key={bug.id}>
            <td>
              <div>{bug.id}</div>
              <div>{bug.description}</div>
            </td>
            <td>{bug.scenario}</td>
            <td>{getStatusBadge(bug.status)}</td>
            <td>
              <Badge bg="secondary" pill>{bug.assignee}</Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BugList;