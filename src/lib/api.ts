export const getCurrentWeather = async ({lat,lon}: {lat: number, lon: number}) => {
    try {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);

        const data = await response.json();
        console.log("current data: ", data);
        return data;
    }
    catch(e) {
        console.log('Error in fetching current weather data: ', e);
        return null;
    }
}

export const getForecastWeather = async ({lat,lon}: {lat: number, lon: number}) => {
    try {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const respone = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        
        const data = await respone.json();
        console.log("forecast data: ", data);
        return data;
    }
    catch(e) {
        console.log('Error in fetching forecast weather data: ', e);
        return null;
    }
}

export const getCityName = async ({name}: {name: string}) => {
    try {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const respone = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`);
        
        const data = await respone.json();
        console.log("search data: ", data);
        return data;
    }
    catch(e) {
        console.log('Error in fetching city name: ', e);
        return null;
    }
}