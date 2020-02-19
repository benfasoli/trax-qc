import React from 'react';

import Layout from '../components/Layout';
import PendingUser from '../components/PendingUser';

import {
  getUsers,
  approvePendingUser,
  rejectPendingUser,
  login
} from '../utils/auth.js';

class Admin extends React.Component {
  state = {
    loginError: false,
    pendingUsers: undefined,
    user: undefined
  };

  componentDidMount() {
    login()
      .then(user => {
        this.setState({ user });
        this.handleGetPendingUsers();
      })
      .catch(err => {
        this.setState({ loginError: err.message });
      });
  }

  handleGetPendingUsers() {
    getUsers(true).then(res => {
      var pendingUsers = [];
      res.forEach(doc => {
        const data = doc.data();
        const pendingUser = {
          accessToken: data.accessToken,
          displayName: data.displayName,
          email: data.email,
          uid: doc.id
        };
        pendingUsers.push(pendingUser);
      });
      this.setState({ pendingUsers });
    });
  }

  handleUserApprove(uid) {
    console.log(uid);
    approvePendingUser(uid).then(this.handleGetPendingUsers);
  }

  handleUserReject(uid) {
    rejectPendingUser(uid);
    this.handleGetPendingUsers();
  }

  render() {
    console.log('state', this.state);
    return (
      <Layout>
        <div className="container">
          {this.state.loginError && (
            <p>Not authorized. {this.state.loginError}</p>
          )}
          {this.state.pendingUsers && <h1>Pending Users</h1>}
          {this.state.pendingUsers && this.state.pendingUsers.length === 0 && (
            <>&#10003; None.</>
          )}
          {this.state.pendingUsers &&
            this.state.pendingUsers.map(u => {
              return (
                <PendingUser
                  key={u.uid}
                  pendingUser={u}
                  onApprove={() => this.handleUserApprove(u.uid)}
                  onReject={() => this.handleUserReject(u.uid)}
                />
              );
            })}
        </div>
        <style jsx>{`
          .container {
            display: block;
            min-width: 220px;
          }
          h1 {
            margin-bottom: 20px;
          }
        `}</style>
      </Layout>
    );
  }
}
export default Admin;
