import React from 'react';

import { approvePendingUserId, rejectPendingUserId } from '../utils/auth';

const PendingUser = ({ pendingUser }) => (
  <div className="card">
    <div className="card-body">
      <h5 class="card-title">{pendingUser.displayName}</h5>
      <p class="card-text text-muted">Email: {pendingUser.email}</p>
    </div>
    <div className="btn-group" style={{ width: '100%' }}>
      <button
        className="btn btn-success"
        onClick={() => approvePendingUserId(pendingUser.uid)}
        style={{ width: '50%' }}>
        Approve
      </button>
      <button
        className="btn btn-danger"
        onClick={() => rejectPendingUserId(pendingUser.uid)}
        style={{ width: '50%' }}>
        Reject
      </button>
    </div>
  </div>
);
export default PendingUser;
