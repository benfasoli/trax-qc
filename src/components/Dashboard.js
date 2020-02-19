import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import Papa from 'papaparse';

import Loader from './Loader';
import PendingUsers from './PendingUsers';
import Plot from './Plot';

const API_URL =
  'http://meso2.chpc.utah.edu/aq/cgi-bin/download_mobile_archive_qc.cgi';
const ACCESSKEY = 'd8edbc8ed54b401f82870ba28d1cee0e';
// yr = four digit year
// mo = two digit month
// dy = two digit day
// stid = station identifier (TRX01, TRX02, RAIL1, HAWTH, and eventually TRX03)
// datatype = device/data type (either gpsmet, ozone, or pm are currently options)
// accesskey = your access key (same one you use for the other services should work I think - Andy FYI yours should also work here)
// daysback = number of days of data to access (optional, default/max amount is 7)

// Now for the QC part.  There is an additional column produced at the end called “qc_flags”.  If flags are applied to a particular observation, there will be a semi-colon delimited list of flag IDs in this column.  Those flag IDs should correspond to the IDs we have in the Google Sheets master list.  Flag IDs -1 to -10 will show regardless of “datatype” chosen, since most are things like “Invalid GPS”, “Train Inside”, etc.  The other flag IDs will show if they apply to the datatype selected (e.g. if ozone is selected, any flags applicable to the ozone data will appear).
// I generated several random flags for the June 10 - June 14 period to test with, so if you want to build/test things on your side, using that general period of time might be good to start.  If you have any other questions or see any bugs at all, feel free to let me know.

const fetcher = (url, yr, mo, dy, stid, datatype) =>
  axios
    .get(url, {
      params: {
        yr,
        mo,
        dy,
        stid,
        datatype,
        daysback: 1,
        accesskey: ACCESSKEY
      }
    })
    .then(res => res.data)
    .then(csv => csv.substring(csv.indexOf('\n') + 1))
    .then(csv => Papa.parse(csv, { header: true }));

const Dashboard = () => {
  const { data } = useSWR(
    [API_URL, '2019', '06', '11', 'TRX01', 'pm'],
    fetcher
  );

  console.log(data);

  return (
    <>
      <PendingUsers />
      {data ? (
        <div style={{ height: '100%' }}>
          <Plot
            x={data.data.map(row => new Date(`${row.Date}T${row.TimeUTC}Z`))}
            y={data.data.map(row => parseFloat(row.esampler_pm25_ugm3))}
            color={data.data.map(row => parseFloat(row.esampler_rh_pcent))}
            symbol={data.data.map(row => row.qc_flags ? 'x' : 'circle')}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Dashboard;
