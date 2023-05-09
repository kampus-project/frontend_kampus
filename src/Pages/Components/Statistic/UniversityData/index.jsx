import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2'
function DiagramStudents({chartDataUniversity}) {
    return <Bar data={chartDataUniversity}/>
}

export default DiagramStudents;