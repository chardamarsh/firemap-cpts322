import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Marker = styled.div`
    width: ${props => props.zoom * 2}px;
    height: ${props => props.zoom * 2}px;
    background: #ed7057;
    border-radius: 50%;
    transition: all 1s ease;
    transform: ${props => props.ready ? 'scale(1)' : 'scale(0)'};
    animation: pulse 2s infinite;
    cursor: pointer;
`

const FireMarker = (props) => {
    const [delay, setDelay] = useState(0)
    const [ready, setReady] = useState(false)
    
    useEffect(() => setDelay(Math.random()*2), [])

    useEffect(() => {
        if (!props.loading) setTimeout(() => setReady(true), 100)
    }, [props.loading])

    return <Marker {...props} ready={ready} className='fire-marker' style={{ animationDelay: `${delay}s` }} />
}

export default FireMarker