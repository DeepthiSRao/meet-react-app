import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { COLORS } from './constants';

const EventPieChart = ({events}) => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
   
    const getData = () => {
        const result = genres.map(genre => ({
            name: genre,
            value: events.filter(e => e.summary.split(' ').includes(genre)).length
        })); 
        return result.filter(data => data.value !== 0);
    }

    return ( 
        <div>
            <h4>Pie Chart</h4>
            <ResponsiveContainer height={400} >
                <PieChart height={400}>
                <Legend layout="horizontal" verticalAlign="top" align="center" height={25} />
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
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
 
export default EventPieChart;