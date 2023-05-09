import React from 'react';
import {Pie} from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';

function PaymentType({chartDataPayment}) {
    return <Pie data={chartDataPayment}/>
}

export default PaymentType;