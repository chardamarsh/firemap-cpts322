import { useState } from 'react'

import Toggle from './Toggle'

const Sidebar = (props) => {
  const [open, setOpen] = useState(false)

  const { darkMode, setDarkMode } = props

  return (
    <>
      <div id='sidebar' className={open ? 'open' : 'closed'}>
        <div className='header'>
          <img src={require('./img/close.png')} className={`close-sidebar ${open && 'open'}`} onClick={() => setOpen(false)} />
        </div>
        <div className='content'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: 20 }}>Dark mode</p>
          <Toggle on={darkMode} toggle={() => setDarkMode(!darkMode)} />
        </div>

        </div>
      </div>

      <img src={require('./img/ham.png')} className={`open-sidebar ${open && 'open'}`} onClick={() => setOpen(true)} />
    </>
  )
}


export default Sidebar