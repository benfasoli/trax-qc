import React from 'react';
import plotly from 'plotly.js/dist/plotly';
import createPlotComponent from 'react-plotly.js/factory';

const Plot = createPlotComponent(plotly);

export default props => {
  return (
    <Plot
      data={[
        {
          x: [1, 2, 3],
          y: [2, 6, 3],
          type: 'scatter',
          mode: 'lines+points',
          marker: { color: 'red' }
        },
        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] }
      ]}
      layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
    />
  );
};
