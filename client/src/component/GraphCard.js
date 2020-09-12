import React, {useEffect, useState} from "react";
import Chart from 'chart.js';
export const GraphCard = (props) => {

    const [chart, setChart] = useState(null)

    const setJirChart = async () => {
        const ch = await document.getElementById('myChart')
            const jirChart = new Chart(ch, {
                type: 'line',
                data: {
                    labels: props.jir? props.jir.map((j) => {return j[1].date}): [],
                    datasets: [{
                        label: 'Динамика веса',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: props.jir? props.jir.map((j) => {return j[1].weight}): [],
                    }]
                },
                options: {maintainAspectRatio: false}
            });
            setChart(jirChart);
    }

    const upd = () => {
        if (chart) {
            chart.resize();
        }
    }

    window.addEventListener("resize", () => {
        upd();
    });

    useEffect(() => {
        setJirChart();
    }, [props.jir]);

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