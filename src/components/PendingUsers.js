import React from 'react';

import PendingUser from './PendingUser';

import { usePendingUsers } from '../utils/auth.js';

export default () => {
  const {
    pendingUsers,
    approvePendingUser,
    rejectPendingUser
  } = usePendingUsers();

  return (
    <div className="row">
      {pendingUsers.map(pendingUser => (
        <div className="col-md-6 col-lg-4" key={pendingUser.uid}>
          <PendingUser
            pendingUser={pendingUser}
            onApprove={approvePendingUser}
            onReject={rejectPendingUser}
          />
        </div>
      ))}
    </div>
  );
};
