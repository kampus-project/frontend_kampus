import React from 'react';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
function Directions({chartDataDirections}) {
    return <Pie data={chartDataDirections}/>
}

export default Directions;