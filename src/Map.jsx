import { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'

import FireMarker from './FireMarker'

const stateAbbreviations = [
  { name: 'Alabama', abbreviation: 'AL' },
  { name: 'Alaska', abbreviation: 'AK' },
  { name: 'Arizona', abbreviation: 'AZ' },
  { name: 'Arkansas', abbreviation: 'AR' },
  { name: 'California', abbreviation: 'CA' },
  { name: 'Colorado', abbreviation: 'CO' },
  { name: 'Connecticut', abbreviation: 'CT' },
  { name: 'Delaware', abbreviation: 'DE' },
  { name: 'Florida', abbreviation: 'FL' },
  { name: 'Georgia', abbreviation: 'GA' },
  { name: 'Hawaii', abbreviation: 'HI' },
  { name: 'Idaho', abbreviation: 'ID' },
  { name: 'Illinois', abbreviation: 'IL' },
  { name: 'Indiana', abbreviation: 'IN' },
  { name: 'Iowa', abbreviation: 'IA' },
  { name: 'Kansas', abbreviation: 'KS' },
  { name: 'Kentucky', abbreviation: 'KY' },
  { name: 'Louisiana', abbreviation: 'LA' },
  { name: 'Maine', abbreviation: 'ME' },
  { name: 'Maryland', abbreviation: 'MD' },
  { name: 'Massachusetts', abbreviation: 'MA' },
  { name: 'Michigan', abbreviation: 'MI' },
  { name: 'Minnesota', abbreviation: 'MN' },
  { name: 'Mississippi', abbreviation: 'MS' },
  { name: 'Missouri', abbreviation: 'MO' },
  { name: 'Montana', abbreviation: 'MT' },
  { name: 'Nebraska', abbreviation: 'NE' },
  { name: 'Nevada', abbreviation: 'NV' },
  { name: 'New Hampshire', abbreviation: 'NH' },
  { name: 'New Jersey', abbreviation: 'NJ' },
  { name: 'New Mexico', abbreviation: 'NM' },
  { name: 'New York', abbreviation: 'NY' },
  { name: 'North Carolina', abbreviation: 'NC' },
  { name: 'North Dakota', abbreviation: 'ND' },
  { name: 'Ohio', abbreviation: 'OH' },
  { name: 'Oklahoma', abbreviation: 'OK' },
  { name: 'Oregon', abbreviation: 'OR' },
  { name: 'Pennsylvania', abbreviation: 'PA' },
  { name: 'Rhode Island', abbreviation: 'RI' },
  { name: 'South Carolina', abbreviation: 'SC' },
  { name: 'South Dakota', abbreviation: 'SD' },
  { name: 'Tennessee', abbreviation: 'TN' },
  { name: 'Texas', abbreviation: 'TX' },
  { name: 'Utah', abbreviation: 'UT' },
  { name: 'Vermont', abbreviation: 'VT' },
  { name: 'Virginia', abbreviation: 'VA' },
  { name: 'Washington', abbreviation: 'WA' },
  { name: 'West Virginia', abbreviation: 'WV' },
  { name: 'Wisconsin', abbreviation: 'WI' },
  { name: 'Wyoming', abbreviation: 'WY' }
];

const US_view = {
    center: {
      lat: 38.64244504874176,
      lng: -96.84870757327883
    },
    zoom: 5,
    bounds: {
      nw: {   //NorthWest
          lat: 49.3457868,
          lng: -124.7844079
      },
      se: {   //SouthEast
          lat: 24.7433195,
          lng: -66.9513812
      }}
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



const Map = (props) => {
    const { data=[], loading, darkMode, setSelectedFireData, setSelectedWeatherData, handleToggle } = props
    const [centerCoords, setCenterCoords] = useState(US_view.center)
    const [zoomLevel, setZoomLevel] = useState(US_view.zoom)
    //const [selectedFireData, setSelectedFireData] = useState({})
    //const [selectedWeatherData, setSelectedWeatherData] = useState({})
    const [showStateList, setShowStateList] = useState(false)
    const [selectedState, setSelectedState] = useState(null)
    const [selectedMarkerCoords, setSelectedMarkerCoords] = useState(null)
      
    const MAX_RETRIES = 5; // maximum number of retries
    const RETRY_INTERVAL = 1000; // interval between retries (in milliseconds)

    // Set coordinates if they change
    useEffect(() => {
      if (selectedMarkerCoords) {
        setCenterCoords(selectedMarkerCoords);
      }
    }, [selectedMarkerCoords]);

     // Control state list display size (shows 10 items at most)
    const handleShowStateList = () => {
      setShowStateList(prevState => !prevState);
      if (!showStateList) {
        const stateList = document.querySelectorAll(".map-button");
        stateList.forEach((state, index) => {
          if (index < 10) {
            state.style.display = "block";
          } else {
            state.style.display = "none";
          }
        });
      }
    }
    
    // Find state abbreviation
    // POOState format is "US-state-abbreviation"
    // Set the state
    // Controls the state list visibility.
    const handleSelectState = (stateName) => {
      const selectedStateAbbr = stateAbbreviations.find(state => state.name === stateName).abbreviation;
      console.log(selectedStateAbbr);
      setSelectedState(selectedStateAbbr);
      setShowStateList(false);
    }

    // State list button
    const stateListButton = (
      <button onClick={handleShowStateList} style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 1 }}>
        Select a state
      </button>
    )

    // Map each state to an li element
    const stateList = (
      <div className="state-list" style={{ position: "absolute", bottom: '60px', right: '12px', backgroundColor: "rgba(255, 255, 255, 0)", padding: 10, zIndex: 1, maxHeight: 200, overflowY: "scroll" }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {stateAbbreviations.map((state) => (
            <li key={state.abbreviation} onClick={() => handleSelectState(state.name)} style={{ padding: '10px', margin: '5px 0', backgroundColor: '#f2f2f2', borderRadius: '5px', textAlign: 'center', cursor: 'pointer' }}>{state.name}</li>
          ))}
        </ul>
      </div>
    );
    
    
    
    const getWeatherData = async (lat, lng) => {
      let retryCount = 0;
      let retryCount2 = 0;
      while (retryCount < MAX_RETRIES) {
        try {
          let weather_api_link = "https://api.weather.gov/points/" + lat.toString() + "," + lng.toString();
          let raw_data = await fetch(weather_api_link);
          if (raw_data.ok) {
            while(retryCount2 < MAX_RETRIES)
            {
              try {
                let info = await raw_data.json();
                let weather_info = {};
                //nearest city information
                  weather_info["city"] = info["properties"]["relativeLocation"]["properties"]["city"];
                  weather_info["state"] = info["properties"]["relativeLocation"]["properties"]["state"];
                  const raw_weather_data = await fetch(info["properties"]["forecast"]);
                  if(raw_weather_data.ok) {
                    let temp = {};
                    temp = await raw_weather_data.json();
                    weather_info["forecast"] = temp["properties"]["periods"];
                    setSelectedWeatherData(weather_info);
                    return;
                  }
                  else
                  {
                    console.log("Error: ", weather_info.status, weather_info.statusText);
                  }
              } catch (error) {
                console.log("Error: error")
              }
              retryCount2++;
            }
          } else {
            console.log("Error: ", raw_data.status, raw_data.statusText);
          }
        } catch (error) {
          console.log("Error: ", error);
        }
        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
      }
      console.log("Max retries exceeded");
    };

    // If a user selects a state, return fire markers that only match the selected state abbreviation
    const markers = data.filter(fire => {
      if (selectedState) {
        console.log(fire.attributes.POOState)
        return fire.attributes.POOState === `US-${selectedState}`;
      }
      return true;
    }).map((fire, i) => {
      const lng = fire.geometry.x;
      const lat = fire.geometry.y;
      return (
        <FireMarker
          lat={lat}
          lng={lng}
          key={`marker-${i}`}
          onClick={() => {
            setSelectedFireData(fire);
            getWeatherData(lat, lng);
            handleToggle(true);
            setSelectedMarkerCoords({ lat, lng });
          }}
          zoom={zoomLevel}
          loading={loading}
        />
      );
    });
    
  
    // might wanna debounce this for costly animations/computations
    const onBoundsChange = (center, zoom, bounds, margin) => {
      console.log(`now centered at ${center[0]}, ${center[1]}\n`)
      console.log(`zoom level: ${zoom}`)
      console.log(`zoom level: ${US_view.bounds.nw.lng}`)  //TODO: Locking this into only the US
      if (center[1] < US_view.bounds.nw.lng) {
          setCenterCoords([center[0], US_view.bounds.nw.lng])
      }
      else if (center[1] > US_view.bounds.se.lng) {
        setCenterCoords([center[0], US_view.bounds.se.lng])
      }
      else if (center[0] < US_view.bounds.se.lat) {
        setCenterCoords([US_view.bounds.se.lat, center[1]])
      }
      else if (center[0] > US_view.bounds.nw.lat) {
        setCenterCoords([US_view.bounds.nw.lat, center[1]])
      }
      else
        setCenterCoords(center)
        setZoomLevel(zoom)
    }
    
    return (
      <div id='map' data-testid="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCgxxJFtDClpWPNIxHLJABgkDrL8YrXgbw' }} //This is the API key provided by the google-maps-react page. Change as needed
          center={centerCoords}
          defaultZoom={zoomLevel}
          onBoundsChange={onBoundsChange}
          options={{ styles: darkMode ? darkModeStyles : {}, disableDefaultUI: true }} 
        >
        {markers}
        </GoogleMapReact>
        {showStateList && stateList}
        {stateListButton}
      </div>
    )
  }

export default Map