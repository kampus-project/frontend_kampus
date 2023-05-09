import React from 'react';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';


function RegistrationDependency({chartDataRegistrationDependency}) {
    return <Pie data={chartDataRegistrationDependency}/>
}

export default RegistrationDependency;