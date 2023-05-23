import React from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';


function RegistrationDependency({chartDataRegistrationDependency}) {
    return <Line data={chartDataRegistrationDependency}/>
}

export default RegistrationDependency;