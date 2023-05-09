import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line} from 'react-chartjs-2'
function AllUsers({chartDataAllUsers}) {
    return <Line data={chartDataAllUsers}/>
}

export default AllUsers;