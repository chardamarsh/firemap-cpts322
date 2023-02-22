import { useState, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'

import Map from './Map'
import Loading from './Loading'

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

  #theme-toggler {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%) scale(0);
    z-index: 100;
    transition: all .5s ease;
    opacity: .5;

    &.ready {
      transform: translateX(-50%) scale(1);
    }

    &:hover {
      opacity: 1;
    }

    &.dark {
      background-color: #fff;
      color: #000;
    }

    &.light {
      background-color: #000;
      color: #fff;
    }
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFireData()
  }, [])

  const fetchFireData = async () => {
    setLoading(true)
    const result = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events')
    const { events } = await result.json()
    
    // filter out events that aren't wildfires
    setFireData(events.filter(e => e.categories[0].id === 8))
    setLoading(false)
  }

  return (<div>
    <GlobalStyles />
    <Map data={fireData} loading={loading} />
    <Loading loading={loading} />
  </div>)
}

export default App