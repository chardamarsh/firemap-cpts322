import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
`

const pullmanView = {
  center: {
    lat: 46.7397280850586,
    lng: -117.16366892996282
  },
  zoom: 12
}

const Map = (props) => {
  const { center=pullmanView.center, zoom=pullmanView.zoom } = props

  // probably gonna wanna debounce this for constly animations/computations
  function onBoundsChange(center, zoom, bounds, margin) {
    console.log(`now centered at ${center[0]}, ${center[1]}\n`)
    console.log(`zoom level: ${zoom}`)
  }

  return (
    <div id='map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'put yo key here' }}
        defaultCenter={center}
        defaultZoom={zoom}
        onBoundsChange={onBoundsChange}
      >
      </GoogleMapReact>
    </div>
  )
}

function App() {
  return (<div>
    <GlobalStyles />
    <Map />
  </div>)
}

export default App
