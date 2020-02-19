import React from 'react';
import Plot from 'react-plotly.js';

// Station_ID: "TRX01"
// Date: "2019-06-10"
// TimeUTC: "00:00:00"
// esampler_pm25_ugm3: "1.00"
// esampler_flow_Lmin: "2.00"
// esampler_temp_C: "24.00"
// esampler_rh_pcent: "15.00"
// esampler_error_code: "0.00"
// esampler_pres_hpa: "883.40"
// qc_flags: ""
export default ({ x, y, color, symbol, height }) => {
  height = height || 600;
  
  return (
    <Plot
      data={[
        {
          x,
          y,
          type: 'scattergl',
          mode: 'markers',
          marker: {
            color,
            colorscale: 'Viridis',
            opacity: 0.5,
            symbol
          }
        }
      ]}
      config={{ responsive: true }}
      layout={{ autosize: true }}
      style={{ height, width: 'inherit' }}
    />
  );
};
