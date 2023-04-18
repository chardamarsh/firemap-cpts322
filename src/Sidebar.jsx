import { useState } from 'react'

import Toggle from './Toggle'
import Map from './Map'

const Sidebar = (props) => {
  const [open, setOpen] = useState(false)

  const { darkMode, setDarkMode, selectedFireData, selectedWeatherData} = props

  console.log("selected fire data:")
  console.log(selectedFireData)
  console.log("selected weather data:")
  console.log(selectedWeatherData)

  return (
    <>
      <div id='sidebar' className={open ? 'open' : 'closed'}>
        <div className='header'>
          <img src={require('./img/close.png')} className={`close-sidebar ${open && 'open'}`} onClick={() => setOpen(false)} />
        </div>
        <div className='content'>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '-65px' }}>
          <p style={{ marginRight: 20 }}>Dark mode</p>
          <Toggle on={darkMode} toggle={() => setDarkMode(!darkMode)} />
        </div>
        {/*NOTE TO TEAM MEMBERS: This is just a proof-of-concept of sorts, feel free to style/add to this as you please*/}
        <div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px', fontSize: '20px'}}>
          {
            'attributes' in selectedFireData ? // check that the API info went through
            (
              <>
                <p>{selectedFireData["attributes"]["IncidentName"]}</p>
              </>
            ) : null
          }
          </div>
        </div>
        <div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px'}}>
          {
            'forecast' in selectedWeatherData ? // check that the API info went through
            (
              <>
                <p>{selectedWeatherData["forecast"][0]["detailedForecast"]}</p>
              </>
            ) : null
          }
          </div>
        </div>
        
        </div>
      </div>
      <img src={require('./img/ham.png')} className={`open-sidebar ${open && 'open'}`} onClick={() => setOpen(true)} />
    </>

  )
}


export default Sidebar