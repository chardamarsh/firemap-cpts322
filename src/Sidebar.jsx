import { useState, useEffect } from 'react';
import Toggle from './Toggle';
import Map from './Map';

const Sidebar = (props) => {
  const { darkMode, setDarkMode, selectedFireData, selectedWeatherData, open, setOpen } = props;

  return (
    <>
      <div id='sidebar' className={open ? 'open' : 'closed'} style={{ textAlign: 'center' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px', fontSize: '20px' }}>
              {'attributes' in selectedFireData ? (
                <>
                  <p>{selectedFireData['attributes']['IncidentName']}</p>
                </>
              ) : null}
            </div>
          </div>
          
          <div style={{textAlign: 'left'}}>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              {'forecast' in selectedWeatherData ? (
                <>
                  <p>{selectedWeatherData['forecast'][0]['detailedForecast']}</p>
                </>
              ) : null}
            </div>
          </div>


          <div>
          <div style={{textAlign: 'left', marginTop: '20px'}}>
            {selectedFireData && 'attributes' in selectedFireData ? (
              <>
                <p>Latitude: {selectedFireData.attributes.InitialLatitude || 'N/A'}</p>
                <p>Longitude: {selectedFireData.attributes.InitialLongitude || 'N/A'}</p>
                <p>Incident Size: {selectedFireData.attributes.IncidentSize || 'N/A'} Acres</p>
                <p>Incident Type: {selectedFireData.attributes.IncidentTypeCategory=='WF' ? ('Wildfire'): selectedFireData.attributes.IncidentTypeCategory=='RX' ? ('Prescribed Fire') : 'N/A'}</p>
                <p>Fire Cause: {selectedFireData.attributes.FireCause || 'N/A'}</p>
                <p>Discovery Date: {selectedFireData.attributes.FireDiscoveryDateTime ? new Date(parseInt(selectedFireData.attributes.FireDiscoveryDateTime)).toLocaleString() : 'N/A'}</p>
                <p>Dispatch Center ID: {selectedFireData.attributes.DispatchCenterID || 'N/A'}</p>
                <p>POO Dispatch Center ID: {selectedFireData.attributes.POODispatchCenterID || 'N/A'}</p>
                <p>POO County: {selectedFireData.attributes.POOCounty || 'N/A'}</p>
              </>
            ) : null}
          </div>
        </div>
          
        </div>
      </div>
      <img src={require('./img/ham.png')} className={`open-sidebar ${open && 'open'}`} onClick={() => setOpen(true)} />
    </>
  );
};

export default Sidebar;
