import React from 'react';
import { Table } from 'react-bootstrap';
import Bug from './Bug';

const BugList = () => {
  // This would typically come from a state or props
  const bugs = [
    { id: 'IQUA-1', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Open', assignee: 'KM' },
    { id: 'IQUA-14', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Wip', assignee: 'AJ' },
    { id: 'TBG-69', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Fixed', assignee: 'profile_pic' },
    { id: 'IQUA-777', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Closed', assignee: 'profile_pic' },
    { id: 'ADT-900', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Deferred', assignee: 'profile_pic' },
    { id: 'IQBS-001', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Rejected', assignee: 'KM' },
    { id: 'IQBS-002', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Medium', assignee: 'profile_pic' },
    { id: 'IQBS-003', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'Low', assignee: 'HB' },
    { id: 'IQBS-004', description: 'Performance metrics issue', scenario: 'My Interviews page', status: 'High', assignee: 'AJ' },
  ];

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
        {bugs.map((bugInd) => (
          <Bug key={bugInd.id} indbug={bugInd} />
        ))}
      </tbody>
    </Table>
  );
};

export default BugList;
