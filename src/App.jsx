import { useState, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'

import Map from './Map'
import Loading from './Loading'
import Sidebar from './Sidebar'

const DEBUGGING = false;
// cache 1 or two points, skip the fetching and loading animation

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Noto Sans, sans-serif;
  }

  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  button {
    outline: none;
    border: none;
    padding: 5px 15px;
    border-radius: 99px;
    cursor: pointer;
  }

  #map {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: pink;
  }

  .toggle {
    background: #f7786588;
    padding: 4px;
    border-radius: 99px;
    position: relative;
    width: 50px;
    height: 22px;

    // for simplicity, we'll just hardcode the dimensions of the toggler and the position of the inner sliding ball

    &.on {
      background: #62ea9f88;

      .toggle-ball {
        left: 31px;
        // transform: translateX(calc(-100% - 4px));
      }
    }

    .toggle-ball {
      position: absolute;
      transition: all 0.5s ease;
      width: 14px;
      height: 14px;
      border-radius: 100%;
      background: white;
      left: 4px;
      top: 4px;
    }
  }

  // #theme-toggler {
  //   position: absolute;
  //   top: 10px;
  //   left: 50%;
  //   transform: translateX(-50%) scale(0);
  //   z-index: 100;
  //   transition: all .5s ease;
  //   opacity: .5;

  //   &.ready {
  //     transform: translateX(-50%) scale(1);
  //   }

  //   &:hover {
  //     opacity: 1;
  //   }

  //   &.dark {
  //     background-color: #fff;
  //     color: #000;
  //   }

  //   &.light {
  //     background-color: #000;
  //     color: #fff;
  //   }
  // }

  #sidebar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 300px;
    z-index: 9999;
    color: white;
    background: #0008;
    backdrop-filter: blur(5px);
    transition: transform 0.5s ease;

    &.open {
      transform: translateX(0);
    }

    &.closed {
      transform: translateX(-100%);
    }

    .header {
      padding: 15px;
      display: flex;
      justify-content: flex-end;

      img.close-sidebar {
        transition: transform 0.25s ease, opacity 0.25s ease;
        width: 20px;
        transform: scale(0);
        opacity: 0.5;

        &.open {
          transform: scale(1);
        }

        &:hover {
          opacity: 1;
          transform: scale(1.1);
        }
      }
    }

    .content {
      padding: 30px;
    }
  }


  img.open-sidebar {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 30px;
    transition: transform 0.25s ease, opacity 0.25s ease;
    opacity: 0.5;

    &.open {
      transform: scale(0);
    }

    &:hover {
      transform: scale(1.1);
      opacity: 1;
    }

    // transform: translateX(100%);
  }

  // this animation is applied to each fire marker
  // its nice, because it kinda creates a heatmap since each pulse overlaps others
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0px #ef411f44 }
    100% { box-shadow: 0 0 0 25px #ef411f00 }
  }

  
`

function App() {
  const [fireData, setFireData] = useState([])
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    fetchFireData()
  }, [])

  const fetchFireData = async () => {
    if (DEBUGGING) {
      setFireData([ // NOTE: Swapped old API data format with new format for debugging
          {
            "attributes":{
            "ContainmentDateTime":null,
            "ControlDateTime":null,
            "IncidentSize":426,
            "DispatchCenterID":"SDGPC",
            "EstimatedCostToDate":null,
            "FireBehaviorGeneral":null,
            "FireBehaviorGeneral1":null,
            "FireBehaviorGeneral2":null,
            "FireBehaviorGeneral3":null,
            "FireCause":"Human",
            "FireCauseGeneral":null,
            "FireCauseSpecific":null,
            "FireCode":null,
            "FireDiscoveryDateTime":1672759490000,
            "FireMgmtComplexity":null,
            "IncidentName":"Potato Gulch RX",
            "IncidentShortDescription":null,
            "IncidentTypeCategory":"RX",
            "InitialLatitude":43.82374,
            "InitialLongitude":-103.4538,
            "InitialResponseAcres":null,
            "InitialResponseDateTime":null,
            "IrwinID":"{3D4534CA-9D18-4263-B916-7627E1F7F1AC}",
            "PercentContained":null,
            "POOCity":null,
            "POOCounty":"Custer",
            "POODispatchCenterID":"SDGPC",
            "POOJurisdictionalAgency":"DWF",
            "POOJurisdictionalUnit":"SDSDS",
            "POOLandownerCategory":"State",
            "POOLandownerKind":"Other",
            "POOProtectingAgency":"DWF",
            "POOState":"US-SD",
            "PredominantFuelModel":null,
            "PrimaryFuelModel":null,
            "SecondaryFuelModel":null,
            "TotalIncidentPersonnel":null
          },
          "geometry":{
            "x":-103.45351028947756,
            "y":43.823887072163231
          }
        }
      ])
      return
    }

    let fire_api_url = 'https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/WFIGS_Incident_Locations_Current/' + 
                  'FeatureServer/0/query?where=1%3D1&outFields=ContainmentDateTime,ControlDateTime,IncidentSize,' + 
                  'DispatchCenterID,EstimatedCostToDate,FireBehaviorGeneral,FireBehaviorGeneral1,FireBehaviorGeneral2,' +
                  'FireBehaviorGeneral3,FireCause,FireCauseGeneral,FireCauseSpecific,FireCode,FireDiscoveryDateTime,' + 
                  'FireMgmtComplexity,IncidentName,IncidentShortDescription,IncidentTypeCategory,InitialLatitude,' +
                  'InitialLongitude,InitialResponseAcres,InitialResponseDateTime,IrwinID,PercentContained,POOCity,' +
                  'POOCounty,POODispatchCenterID,POOJurisdictionalAgency,POOJurisdictionalUnit,POOLandownerCategory,' +
                  'POOLandownerKind,POOProtectingAgency,POOState,PredominantFuelModel,PrimaryFuelModel,SecondaryFuelModel,'+
                  'TotalIncidentPersonnel&outSR=4326&f=json'


    setLoading(true)
    const result = await fetch(fire_api_url)

    const events = await result.json()
    
    
    // Putting the API data on the console just for reference
    console.log(events)
    setFireData(events["features"])
   
    setLoading(false)
  }

  return (<div>
    <GlobalStyles />
    <Map darkMode={darkMode} data={fireData} loading={loading} />
    <Sidebar darkMode={darkMode} setDarkMode={bool => setDarkMode(bool)} />
    <Loading loading={loading} />
  </div>)
}

export default App