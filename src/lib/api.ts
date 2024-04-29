export const getCurrentWeather = async ({lat,lon}: {lat: number, lon: number}) => {
    try {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);

        const data = await response.json();
        console.log("data: ", data);
        return data;
    }
    catch(e) {
        console.log('Error in fetching current weather data: ', e);
        return null;
    }
}