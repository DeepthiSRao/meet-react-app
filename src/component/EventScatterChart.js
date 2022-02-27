import React from 'react';
import { CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import { COLORS } from '../utils/constants';

const EventScatterChart = ({events, locations}) => {
    const getData = () => {
        return locations.map(location => ({
            city: location.split(/[-,]+/)[0],
            number: events.filter(event => event.location === location).length,
        }));
    }

    return ( 
        <>
            <ResponsiveContainer height={400} width={'50%'} className='scatter-chart'>
                <ScatterChart
                    margin={{
                    top: 20, right: 60, bottom: 20, left: 20 }} >
                    <CartesianGrid />
                    <XAxis type="category" dataKey="city" name="City" />
                    <YAxis type="number" dataKey="number" name="Number of events" allowDecimals={false} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Number of Events" data={getData()} fill={COLORS[0]} />
                    <Legend />
                </ScatterChart>
            </ResponsiveContainer>
        </>
    );
}
 
export default EventScatterChart;