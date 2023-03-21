import React, { useState } from 'react'
import styled from 'styled-components'



const TooltipContainer = styled.div`
  position: relative;
  display: block;
  &:hover .tooltip {
    opacity: 1;
    transform: translateX(-50%);
    user-select: all;
    pointer-events: all;
  }
`

const TooltipContent = styled.div`
  transition: opacity .25s ease, transform .25s ease;
  opacity: 0;
  user-select: none;
  pointer-events: none;  
  transform: translateX(-50%) translateY(10px);

  background: #fff;
  border-radius: 4px;
  padding: 10px;

  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  z-index: 1;
  max-width: 80vw;

  &:after {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    border-width: 5px;
    border-style: solid;
    border-color: white transparent transparent transparent;
    transform: rotate(180deg);
  }
`

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false)

  // const handleMouseEnter = () => {
  //   setIsVisible(true);
  // }

  // const handleMouseLeave = () => {
  //   setIsVisible(false);
  // }

  return (
    <TooltipContainer>
      {children}
      <TooltipContent className="tooltip">
        {content}
      </TooltipContent>
    </TooltipContainer>
  )
}

export default Tooltip