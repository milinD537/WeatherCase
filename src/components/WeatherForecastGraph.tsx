import React from 'react'
import { ForecastWeatherData, List } from '../lib/types';
import { ResponsiveContainer, LineChart, Line, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area, Legend } from 'recharts';

export default function WeatherForecastGraph({list, cardBackgroundColor, textColor}: {list: List[],cardBackgroundColor: string, textColor: string}) {
    const dataTemp = [
        { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
        { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
        { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
        { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
      ];
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
                    {/* <AreaChart data={data} margin={{ top: 4, right: 8, left: -30, bottom: 0 }}>
                        <XAxis stroke={textColor} opacity={0.5}/>
                        <YAxis stroke={textColor} opacity={0.5}/>
                        <CartesianGrid strokeDasharray="3 3" stroke={textColor} opacity={0.5} />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="main.temp" stroke="#8884d8" />
                    </AreaChart> */}
                </ResponsiveContainer>
            </div>
        </>
    )
}
