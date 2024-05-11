export type Coord = {
    lon: number;
    lat: number;
};

export type Weather = {
    id: number;
    main: string;
    description: string;
    icon: string;
};

export type Main = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
};

export type Wind = {
    speed: number;
    deg: number;
};

export type Clouds = {
    all: number;
};

export type Sys = {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
    pod?: string;
};

export type Rain = {
    "1h"?: number;
    "3h"?: number;
};

export type CurrentWeatherData = {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    rain?: Rain;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
};

export type City = {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
};
export type List = {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    rain: Rain;
    sys: Sys;
    dt_txt: string;
};
export type ForecastWeatherData = {
    cod: string;
    message: number;
    cnt: number;
    list: [];
    city: City;
};

export type SearchArrayData = {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
};