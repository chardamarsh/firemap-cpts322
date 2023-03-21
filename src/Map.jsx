import { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'

import FireMarker from './FireMarker'

const US_view = {
    center: {
      lat: 42.87582239977556,
      lng: -98.61874705496282
    },
    zoom: 4
}

const darkModeStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
]

const getWeatherData = async (lat, lng) => {

  let weather_api_link = "https://api.weather.gov/points/" + lat.toString() + "," + lng.toString();
  const raw_data = await fetch(weather_api_link);
  const info = await raw_data.json();
  let weather_info = {};

  //nearest city information
  weather_info["city"] = info["properties"]["relativeLocation"]["properties"]["city"];
  weather_info["state"] = info["properties"]["relativeLocation"]["properties"]["state"];


  const raw_weather_data = await fetch(info["properties"]["forecast"]);
  weather_info["forecast"] = await raw_weather_data.json();

  return weather_info;

}

const Map = (props) => {
    const { data=[], loading } = props
    const [centerCoords, setCenterCoords] = useState(US_view.center)
    const [zoomLevel, setZoomLevel] = useState(US_view.zoom)
    const [darkMode, setDarkMode] = useState(true)

    const markers = data.map((fire, i) => {
        const [lng, lat] = fire.geometries[0].coordinates
        return <FireMarker
            lat={lat}
            lng={lng}
            key={`marker-${i}`}
            onClick={() => {console.log(fire);
              console.log(getWeatherData(lat, lng)); //Placed here for now just to test out getWeatherData()
            }}
            zoom={zoomLevel}
            loading={loading}
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
          bootstrapURLKeys={{ key: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo' }} //This is the API key provided by the google-maps-react page. Change as needed
          defaultCenter={centerCoords}
          defaultZoom={zoomLevel}
          onBoundsChange={onBoundsChange}
          options={{ styles: darkMode ? darkModeStyles : {}, disableDefaultUI: true }}
        >
            {markers}
        </GoogleMapReact>

        <button
          id='theme-toggler'
          className={(darkMode ? 'dark' : 'light') + ' ' + (!loading && 'ready')}
          onClick={() => setDarkMode(!darkMode)}
        >
          Switch to {darkMode ? 'Light' : 'Dark'}
        </button>

      </div>
    )
  }

export default Map