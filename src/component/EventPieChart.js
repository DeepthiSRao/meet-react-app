import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { COLORS } from '../utils/constants';

const EventPieChart = ({events}) => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
   
    const getData = () => {
        const result = genres.map(genre => ({
            name: genre,
            value: events.filter(e => e.summary.split(' ').includes(genre)).length
        })); 
        return result.filter(data => data.value !== 0);
    }

    return ( 
        <>
            <ResponsiveContainer height={400} width={'50%'} className='pie-chart'>
                <PieChart
                    margin={{
                    top: 20, right: 20, bottom: 20, left: 20 }}>              
                    <Pie
                        data={getData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {getData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" height={25} />   
                </PieChart>
            </ResponsiveContainer>
        </>
    );
}
 
export default EventPieChart;