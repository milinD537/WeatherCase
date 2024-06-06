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
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </>
    )

}
export default WeatherMapMarker
