import React, {useEffect, useState} from "react";
import Chart from 'chart.js';

export const GraphCard = (props) => {

    const [ctx, setCtx] = useState(null);

    console.log()

    const setChart = () => {
        const jirChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: props.jir.map((j) => {return j[1].date}),
                datasets: [{
                    label: 'Динамика веса',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: props.jir.map((j) => {return j[1].weight}),
                }]
            },
            options: {maintainAspectRatio: false}
        });
    }

    useEffect(() => {
        setCtx(document.getElementById('myChart'));
        if (ctx) {
            setChart();
        }
    })

    return (
        <>
            <div className="col s12 m8 inner">
                <div className="card graph-card">
                    <div className="card-content">
                        <div className='chart-container'>
                            <canvas id='myChart'></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}