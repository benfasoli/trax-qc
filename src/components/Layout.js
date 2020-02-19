import React from 'react';

import PendingUsers from './PendingUsers';

export default ({ auth, children }) => {
  const { user, authError, signOut } = auth;
  return (
    <>
      <nav className="navbar navbar-light bg-light" style={{marginBottom: '1rem'}}>
        <div className="navbar-brand">TRAX Data</div>
        {user && (
          <button onClick={signOut} className="btn btn-primary nav-item">
            Sign Out
          </button>
        )}
      </nav>

      <div className="container">
        {authError ? (
          <div>{authError.message}</div>
        ) : (
          user && (
            <>
              <PendingUsers />
              {children}
            </>
          )
        )}
      </div>
    </>
  );
};
