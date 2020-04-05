import React from 'react';
import LineChart from '../LineChart';

export default {
  title: 'Line Chart',
  component: LineChart,
};

const config1 = {
  width: 400,
  height: 200,

  data: {
    // labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "Width",
      fill: false,
      fillColor: "rgba(0,0,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      backgroundColor: "rgba(0,0,220,0.2)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [41, 92, 45, 62, 14, 12, 11, 32, 68, 98, 10, 112]
    }, {
      label: "Height",
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [41, 24, 5, 6, 7, 76, 87, 8, 6, 34, 45, , 79, 88, 7, 33, 4, 7, 98]
    }]
  },
  options: {
    animation: false,
    maintainAspectRatio: false,
    // responsive: true,
    // //Boolean - If we want to override with a hard coded scale
    // scaleOverride: true,
    // //** Required if scaleOverride is true **
    // //Number - The number of steps in a hard coded scale
    // scaleSteps: 10,
    // //Number - The value jump in the hard coded scale
    // scaleStepWidth: 10,
    // //Number - The scale starting value
    // scaleStartValue: 0,
  }
}

export const Default = () =>
  <div style={{width: '400px'}}>
    <LineChart {...config1} />
  </div>
