import { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'

import FireMarker from './FireMarker'

const pullmanView = {
    center: {
      lat: 46.7397280850586,
      lng: -117.16366892996282
    },
    zoom: 5
}

const Map = (props) => {
    const { data=[] } = props
    const [centerCoords, setCenterCoords] = useState(pullmanView.center)
    const [zoomLevel, setZoomLevel] = useState(pullmanView.zoom)

    const markers = data.map((fire, i) => {
        const [lng, lat] = fire.geometries[0].coordinates
        return <FireMarker
            lat={lat}
            lng={lng}
            key={`marker-${i}`}
            onClick={() => console.log(fire)}
            zoom={zoomLevel}
        />
    })
  
    // might wanna debounce this for constly animations/computations
    const onBoundsChange = (center, zoom, bounds, margin) => {
      console.log(`now centered at ${center[0]}, ${center[1]}\n`)
      console.log(`zoom level: ${zoom}`)
      setCenterCoords(center)
      setZoomLevel(zoom)
    }

    useEffect(() => {
        console.log('the dater', data)
    }, [data])
  
    return (
      <div id='map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '*****google maps api key*****' }}
          defaultCenter={centerCoords}
          defaultZoom={zoomLevel}
          onBoundsChange={onBoundsChange}
        >
            {markers}
        </GoogleMapReact>
      </div>
    )
  }

export default Map