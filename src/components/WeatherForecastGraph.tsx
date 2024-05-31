import React from 'react'
import { ForecastWeatherData, List } from '../lib/types';
import { ResponsiveContainer, LineChart, Line, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area, Legend } from 'recharts';

export default function WeatherForecastGraph({list, cardBackgroundColor, textColor}: {list: List[],cardBackgroundColor: string, textColor: string}) {
    const data = list;
    const dataNew = list.map((data)=> ({
        time: new Date((data.dt * 1000)).getHours() % 12,
        temp: data.main.temp,
    }))
    
    return (
        <>
            <div className='backdrop-blur-[50px] p-4 rounded-2xl h-full w-auto min-[900px]:max-w-[420px] aspect-[1.135]' style={{backgroundColor: cardBackgroundColor}}>
                <ResponsiveContainer className={''}>
                    <LineChart data={dataNew} width={415} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                        <XAxis stroke={textColor} opacity={0.5} dataKey="time" />
                        <YAxis stroke={textColor} opacity={0.5} unit=" C" />
                        <CartesianGrid strokeDasharray="3 3" stroke={textColor} opacity={0.5} />
                        <Tooltip wrapperStyle={{borderRadius: "1rem", overflow: "hidden"}} contentStyle={{backgroundColor: cardBackgroundColor, border: "none",}} />
                        <Legend />
                        <Line type="monotone" dataKey="temp" name='Temperature (in C)' stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}
