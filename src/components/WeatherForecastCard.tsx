import { List } from "../lib/types";

export default function WeatherForecastCard({item, cardBackgroundColor}: {item: List,cardBackgroundColor: string}) {
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const time = new Date(item.dt * 1000);

    return (
        <>
            <div className="grid gap-1 grid-cols-[0_repeat(3,1fr)] hover:grid-cols-[0.4rem_repeat(3,1fr)] transition-[grid-template-columns]">
                <div className="lectureCardActiveBar | bg-[#38A2F8] rounded-full |"></div>
                <div className="p-2 px-4 rounded-[0.3125rem] shadow-[0_8px_15.1px_hsl(0,1%,25%,10%)] backdrop-blur-[50px] | col-start-2 col-span-full | grid grid-cols-subgrid" style={{backgroundColor: cardBackgroundColor}}>
                    <p className="self-center">{days[time.getDay()]}, {months[time.getMonth()]} {time.getDate()}</p>
                    <div className="flex items-center | justify-self-center">
                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="" />
                        <p><span>{Math.round(item.main.temp_max)}</span> / <span>{Math.round(item.main.temp_min)}</span> <sup>o</sup>C</p>
                    </div>
                    <p className="justify-self-end self-center font-thin text-sm">{item.weather[0].description}</p>
                </div>
            </div>
        </>
    )
}