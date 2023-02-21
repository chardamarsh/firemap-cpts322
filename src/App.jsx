import { useState, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'

import Map from './Map'
import Load from './Load'

const delay = () => {
  let thing = Math.random()
  alert(thing)
  return thing
}

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

  #map {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: pink;
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
    <Map data={fireData} />
    <Load loading={loading} />
  </div>)
}

export default App