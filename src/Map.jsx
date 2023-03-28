import { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import FireMarker from './FireMarker'
import FireRiskMarker from './FireRiskMarker'

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
  let temp = {};
  temp = await raw_weather_data.json();
  weather_info["forecast"] = temp["properties"]["periods"]

  return weather_info;

}

const Map = (props) => {
    const { data=[], loading, darkMode } = props
    const [centerCoords, setCenterCoords] = useState(US_view.center)
    const [zoomLevel, setZoomLevel] = useState(US_view.zoom)

    const riskMarkers = data.map((fire, i) => {
      const lng = fire["geometry"]["x"]
      const lat = fire["geometry"]["y"]
      //TODO Make this a yellow marker non flashing and add a toggle for it in the.
      return <FireRiskMarker
          lat={lat}
          lng={lng}
          key={`marker-${i}`}
          onClick={() => {console.log(fire);      // contains all of the fire-specific information
            console.log(getWeatherData(lat, lng)); //Placed here for now just to test out getWeatherData()
          }}
          zoom={zoomLevel}
          loading={loading}
      />
  })    

    const markers = data.map((fire, i) => {
        const lng = fire["geometry"]["x"]
        const lat = fire["geometry"]["y"]
        return <FireMarker
            lat={lat}
            lng={lng}
            key={`marker-${i}`}
            onClick={() => {console.log(fire);      // contains all of the fire-specific information
              console.log(getWeatherData(lat, lng)); //Placed here for now just to test out getWeatherData()
            }}
            zoom={zoomLevel}
            loading={loading}
        />
    })
  
    // might wanna debounce this for costly animations/computations
    const onBoundsChange = (center, zoom, bounds, margin) => {
      console.log(`now centered at ${center[0]}, ${center[1]}\n`)
      console.log(`zoom level: ${zoom}`)
      setCenterCoords(center)
      setZoomLevel(zoom)
    }
  
    return (
      <div id='map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCgxxJFtDClpWPNIxHLJABgkDrL8YrXgbw' }} //This is the API key provided by the google-maps-react page. Change as needed
          defaultCenter={centerCoords}
          defaultZoom={zoomLevel}
          onBoundsChange={onBoundsChange}
          options={{ styles: darkMode ? darkModeStyles : {}, disableDefaultUI: true }}
        >
            {markers}
            {riskMarkers}
        </GoogleMapReact>
      </div>
    )
  }

export default Map