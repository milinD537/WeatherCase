import React from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Coords } from '../../lib/types';
import WeatherMapMarker from './WeatherMapMarker';

export default function WeatherMap({layer = "", coords}: { layer: string, coords: Coords }) {
    let layerPNG = layer;
    // const position = [51.505, -0.09]
    // const lat = coords.lat;
    // const lon = coords.lon;
    // console.log(lat, lon);
    
    // const position = [lat, lon]
    // let map = L.map()

    return (
        <>
            <div className='rounded-2xl overflow-hidden h-full max-[899px]:aspect-[1.5]'>
                <MapContainer center={coords} zoom={11} scrollWheelZoom={true} style={{width: "100%", height: "100%"}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <TileLayer url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=b9223694f7317c70cedc1e8b15d4d6db" />
                    <WeatherMapMarker coords={coords} />
                </MapContainer>

            </div>
        </>
    )
}
