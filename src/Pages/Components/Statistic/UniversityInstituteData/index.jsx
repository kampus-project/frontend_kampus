import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2'
function UniversityInstituteData({chartDataInstitute}) {
    return <Bar data={chartDataInstitute}/>
}

export default UniversityInstituteData;