import React from 'react';

import Dashboard from './components/Dashboard';

import { useAuth } from './utils/auth.js';

const App = () => {
  const { user, authError, signOut } = useAuth();

  return (
    <>
      <nav
        className="navbar navbar-light bg-light"
        style={{ marginBottom: '1rem' }}>
        <div className="navbar-brand">TRAX Data</div>
        {user && (
          <button onClick={signOut} className="btn btn-primary nav-item">
            Sign Out
          </button>
        )}
      </nav>

      <div className="container-fluid">
        {authError ? <div>{authError.message}</div> : user && <Dashboard />}
      </div>
    </>
  );
};

export default App;
