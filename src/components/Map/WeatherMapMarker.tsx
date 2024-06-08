import React from 'react'
import { useMap, Marker, Popup } from 'react-leaflet'
import { Coords } from '../../lib/types'
import { useEffect } from 'react'

const WeatherMapMarker = ({coords}:{coords: Coords}) => {
    const map = useMap()
    useEffect(() => {
      map.flyTo(coords)
    }, [coords])
    
    return (
        <>
            <Marker position={coords}>
                <Popup>
                    Lat: {coords[0]}<br />Lon: {coords[1]}
                </Popup>
            </Marker>
        </>
    )

}
export default WeatherMapMarker
