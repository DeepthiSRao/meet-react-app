import React from 'react';
import { CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import { COLORS } from './constants';

const EventScatterChart = ({events, locations}) => {
    const getData = () => {
        return locations.map(location => ({
            city: location.split(/[-,]+/)[0],
            number: events.filter(event => event.location === location).length,
        }));
    }

    return ( 
        <div className="events-chart">
            <h4>Upcoming events in each city</h4>
            <ResponsiveContainer height={400} >
                <ScatterChart
                    margin={{
                    top: 20, right: 20, bottom: 20, left: 20 }} >
                    <CartesianGrid />
                    <XAxis type="category" dataKey="city" name="City" />
                    <YAxis type="number" dataKey="number" name="Number of events" allowDecimals={false} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Number of Events" data={getData()} fill={COLORS[0]} />
                    <Legend />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}
 
export default EventScatterChart;