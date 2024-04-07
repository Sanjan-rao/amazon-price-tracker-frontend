"use client"
import { Chart } from 'react-charts';
import React from 'react';

export const DisplayChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    const primaryAxis = React.useMemo(
        () => ({
            getValue: datum => datum.time,
        }),
        []
    );

    const secondaryAxes = React.useMemo(
        () => [
            {
                getValue: datum => datum.price,
            },
        ],
        []
    );

    return (
        <div style={{ width: '100%', height: '300px' }}>
            <Chart
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                }}
            />
        </div>
    );
};