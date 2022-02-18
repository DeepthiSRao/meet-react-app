import React from 'react';
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';

const EventChart = ({events, locations}) => {
    const getData = () => {
        return locations.map(location => ({
            city: location.split(',')[0],
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
                    <Scatter name="A school" data={getData()} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}
 
export default EventChart;