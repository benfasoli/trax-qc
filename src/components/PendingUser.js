import React from 'react';

const PendingUser = ({ pendingUser, onApprove, onReject }) => (
  <div className="card">
    <div className="card-body">
      <h5 class="card-title">{pendingUser.displayName}</h5>
      <p class="card-text text-muted">Email: {pendingUser.email}</p>
    </div>
    <div className="btn-group" style={{ width: '100%' }}>
      <button
        className="btn btn-success"
        onClick={() => onApprove(pendingUser.uid)}
        style={{ width: '50%' }}>
        Approve
      </button>
      <button
        className="btn btn-danger"
        onClick={() => onReject(pendingUser.uid)}
        style={{ width: '50%' }}>
        Reject
      </button>
    </div>
  </div>
);
export default PendingUser;
