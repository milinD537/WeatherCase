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
    return (
        <>
            <div className='backdrop-blur-[50px] useGPU p-4 rounded-2xl h-full w-auto min-[900px]:max-w-[400px]' style={{backgroundColor: cardBackgroundColor}}>
                <ResponsiveContainer className={'w-full'}>
                    <LineChart data={data} margin={{ top: 4, right: 8, left: -30, bottom: 0 }}>
                        <XAxis stroke={textColor} />
                        <YAxis stroke={textColor} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="main.temp" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
                {/* <ResponsiveContainer >
                    <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <XAxis dataKey="dt" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="main.temp" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer> */}
            </div>
        </>
    )
}
