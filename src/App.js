import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Layout from './components/Layout';
import Loader from './components/Loader';

import { useAuth } from './utils/auth.js';
// const Plot = dynamic(import('../components/Plot'), {
//   ssr: false
// });

const API_URL =
  'http://meso2.chpc.utah.edu/aq/cgi-bin/download_mobile_archive.cgi';

//   You can call the service through this URL here:

// http://utahaq.chpc.utah.edu/aq/cgi-bin/download_mobile_archive_qc.cgi

// with the following arguments…

// yr = four digit year
// mo = two digit month
// dy = two digit day
// stid = station identifier (TRX01, TRX02, RAIL1, HAWTH, and eventually TRX03)
// datatype = device/data type (either gpsmet, ozone, or pm are currently options)
// accesskey = your access key (same one you use for the other services should work I think - Andy FYI yours should also work here)
// daysback = number of days of data to access (optional, default/max amount is 7)

// The “datatype” argument was needed to help keep the volume/processing time down so that way I’m not trying to match times between different device HDF5 files.  Basically what you get back here is a straight dump from the HDF5 files, which speeds it up.

// Now for the QC part.  There is an additional column produced at the end called “qc_flags”.  If flags are applied to a particular observation, there will be a semi-colon delimited list of flag IDs in this column.  Those flag IDs should correspond to the IDs we have in the Google Sheets master list.  Flag IDs -1 to -10 will show regardless of “datatype” chosen, since most are things like “Invalid GPS”, “Train Inside”, etc.  The other flag IDs will show if they apply to the datatype selected (e.g. if ozone is selected, any flags applicable to the ozone data will appear).

// I generated several random flags for the June 10 - June 14 period to test with, so if you want to build/test things on your side, using that general period of time might be good to start.  If you have any other questions or see any bugs at all, feel free to let me know.


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    setIsLoading(false);
    axios.get(API_URL, {params: {
      yr: '2019',
      mo: '01',
      dy: '01',
      stid: 'TRX01',
      datatype: 'pm',
      accesskey: ''
    }})
  }, []);

  return <Layout auth={auth}>{isLoading ? <Loader /> : 'content'}</Layout>;
};

export default App;

//   // fetchData = () => {
//   //   this.setState({ showLoader: true });

//   //   fetch(`${API_URI}?accesskey=${this.props.apiToken}`).then(res => {
//   //     console.log(res);
//   //     //   if (res.ok) {
//   //     //     // this.setState({ data: res.body });
//   //     //     console.log(res.json());
//   //     //   } else {
//   //     //     console.error(res.json());
//   //     //   }
//   //   });

//   //   this.setState({ showLoader: false });
//   // };

//   render() {
//     console.log('props', this.props);
//     console.log('state', this.state);
//     return (
//       <>
//         <Link href="/admin">
//           <a>Admin</a>
//         </Link>
//         <Layout>
//           {/* {!this.props.apiToken && <Help />} */}
//           {this.state.showLoader && <Loader />}
//           <Plot />
//         </Layout>
//       </>
//     );
//   }
// }
// export default Index;

// import React from 'react';

// import Layout from '../components/Layout';
// import PendingUser from '../components/PendingUser';

// import {
//   getUsers,
//   approvePendingUser,
//   rejectPendingUser,
//   login
// } from '../utils/auth.js';

// class Admin extends React.Component {
//   state = {
//     loginError: false,
//     pendingUsers: undefined,
//     user: undefined
//   };

//   componentDidMount() {
//     login()
//       .then(user => {
//         this.setState({ user });
//         this.handleGetPendingUsers();
//       })
//       .catch(err => {
//         this.setState({ loginError: err.message });
//       });
//   }

//   handleGetPendingUsers() {
//     getUsers(true).then(res => {
//       var pendingUsers = [];
//       res.forEach(doc => {
//         const data = doc.data();
//         const pendingUser = {
//           accessToken: data.accessToken,
//           displayName: data.displayName,
//           email: data.email,
//           uid: doc.id
//         };
//         pendingUsers.push(pendingUser);
//       });
//       this.setState({ pendingUsers });
//     });
//   }

//   handleUserApprove(uid) {
//     console.log(uid);
//     approvePendingUser(uid).then(this.handleGetPendingUsers);
//   }

//   handleUserReject(uid) {
//     rejectPendingUser(uid);
//     this.handleGetPendingUsers();
//   }

//   render() {
//     console.log('state', this.state);
//     return (
//       <Layout>
//         <div className="container">
//           {this.state.loginError && (
//             <p>Not authorized. {this.state.loginError}</p>
//           )}
//           {this.state.pendingUsers && <h1>Pending Users</h1>}
//           {this.state.pendingUsers && this.state.pendingUsers.length === 0 && (
//             <>&#10003; None.</>
//           )}
//           {this.state.pendingUsers &&
//             this.state.pendingUsers.map(u => {
//               return (
//                 <PendingUser
//                   key={u.uid}
//                   pendingUser={u}
//                   onApprove={() => this.handleUserApprove(u.uid)}
//                   onReject={() => this.handleUserReject(u.uid)}
//                 />
//               );
//             })}
//         </div>
//         <style jsx>{`
//           .container {
//             display: block;
//             min-width: 220px;
//           }
//           h1 {
//             margin-bottom: 20px;
//           }
//         `}</style>
//       </Layout>
//     );
//   }
// }
// export default Admin;
