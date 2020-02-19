import React from 'react';

const PendingUser = props => {
  const pendingUser = props.pendingUser;
  return (
    <>
      <div className="user-block">
        <div>
          {pendingUser.displayName} | {pendingUser.email}
        </div>
        <div className="button-row">
          <span onClick={() => props.onApprove()}>&#128077;Approve</span>
          <span onClick={() => props.onReject()}>&#128078;Reject</span>
        </div>
      </div>
      <style jsx>{`
        .user-block {
          margin: 35px 0;
        }
        .button-row {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};
export default PendingUser;
