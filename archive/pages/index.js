import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import Layout from '../components/Layout';
import Loader from '../components/Loader';

import login from '../utils/auth.js';
const Plot = dynamic(import('../components/Plot'), {
  ssr: false
});

const API_URI =
  'http://meso2.chpc.utah.edu/aq/cgi-bin/download_mobile_archive.cgi';

class Index extends React.Component {
  // state = { data: undefined, showLoader: false, user: undefined };
  state = {
    data: undefined,
    showLoader: false,
    user: {
      accessToken:
        'ya29.GlsSB_99WoXwURDAJPQ0Xs-VjiXZ41aZpTDw8XR0FLz7pTBsWQDzNK8XwlB2FiR_TVu-LG2fHibpDTUOR_o9KskDcktKE4P-Vj2H2CibpCbaZqXT-3Upxn1EUoNS',
      displayName: 'Ben Fasoli',
      email: 'benfasoli@gmail.com',
      uid: 'ti1AXVrPp0gk9KDMTFwtcH3RFNL2'
    }
  };

  componentDidMount() {
    login()
      .then(user => {
        this.setState({ user });
      })
      .catch(err => {
        this.setState({ loginError: err.message });
      });
  }

  // fetchData = () => {
  //   this.setState({ showLoader: true });

  //   fetch(`${API_URI}?accesskey=${this.props.apiToken}`).then(res => {
  //     console.log(res);
  //     //   if (res.ok) {
  //     //     // this.setState({ data: res.body });
  //     //     console.log(res.json());
  //     //   } else {
  //     //     console.error(res.json());
  //     //   }
  //   });

  //   this.setState({ showLoader: false });
  // };

  render() {
    console.log('props', this.props);
    console.log('state', this.state);
    return (
      <>
        <Link href="/admin">
          <a>Admin</a>
        </Link>
        <Layout>
          {/* {!this.props.apiToken && <Help />} */}
          {this.state.showLoader && <Loader />}
          <Plot />
        </Layout>
      </>
    );
  }
}
export default Index;
