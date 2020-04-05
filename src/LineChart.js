import React, { useEffect } from 'react';

import { Chart, Line } from 'react-chartjs-2';

export default function LineChart(props) {

    const update = (data) => {
        console.log(data);
    }

    useEffect(() => {
        Chart.pluginService.register({
            afterDraw: function (chart, easing) {
                // Plugin code.
            }
        });
    });

    return (
        <div style={{ width: props.width, height: props.height }}>
            <Line
                data={props.data}
                options={{ maintainAspectRatio: false, ...props.options }} />
        </div>
    )
}