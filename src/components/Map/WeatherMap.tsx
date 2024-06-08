import React, { useState } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Coords } from '../../lib/types';
import WeatherMapMarker from './WeatherMapMarker';

export default function WeatherMap({cardBackgroundColor, coords}: {cardBackgroundColor: string, coords: Coords }) {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [layer, setLayer] = useState<string>("temp_new");

    return (
        <>
            <div className='relative rounded-2xl overflow-hidden h-full max-[899px]:aspect-[1.135]'>
                <select name="weatherLayers" id="weatherLayers" className='absolute z-[999] top-4 right-4 p-2 rounded-[inherit] backdrop-blur-[50px]' style={{backgroundColor: cardBackgroundColor}} onChange={(e) => setLayer(e.target.value)}>
                    <option value="clouds_new">Clouds</option>
                    <option value="precipitation_new">Precipitation</option>
                    <option value="pressure_new">Sea level pressure</option>
                    <option value="wind_new">Wind speed</option>
                    <option value="temp_new" selected>Temperature</option>
                </select>
                <MapContainer center={coords} zoom={11} scrollWheelZoom={true} style={{width: "100%", height: "100%"}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <TileLayer url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${API_KEY}`} />
                    <WeatherMapMarker coords={coords} />
                </MapContainer>
            </div>
        </>
    )
}
