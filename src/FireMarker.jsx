import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Marker = styled.div`
    width: ${props => props.zoom * 2}px;
    height: ${props => props.zoom * 2}px;
    background: #ed7057;
    border-radius: 999px;
    animation: pulse 2s infinite;
    cursor: pointer;
`

const FireMarker = (props) => {
    const [delay, setDelay] = useState(0)
    
    useEffect(() => setDelay(Math.random()*2), [])

    return <Marker {...props} className='fire-marker' style={{ animationDelay: `${delay}s` }} />
}

export default FireMarker