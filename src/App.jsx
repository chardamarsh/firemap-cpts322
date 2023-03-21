import { useState, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'

import Map from './Map'
import Loading from './Loading'
import Sidebar from './Sidebar'

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
    width: 50px;
    padding: 4px;
    border-radius: 99px;
    position: relative;
    height: 23px;

    // for simplicity, we'll just hardcode the position of the sliding inner ball

    &.on {
      background: #62ea9f88;

      .toggle-ball {
        left: 100%;
        transform: translateX(calc(-100% - 4px));
      }
    }

    .toggle-ball {
      position: absolute;
      transition: all 0.5s ease;
      width: 15px;
      height: 15px;
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
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

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
    <Map darkMode={darkMode} data={fireData} loading={loading} />
    <Sidebar darkMode={darkMode} setDarkMode={bool => setDarkMode(bool)} />
    <Loading loading={loading} />
  </div>)
}

export default App