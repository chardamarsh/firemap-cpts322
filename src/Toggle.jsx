const Toggle = (props) => {
  const { on, toggle } = props

  return (
    <div className={`toggle ${on && 'on'}`} onClick={toggle}>
      <div className={'toggle-ball'}></div>
    </div>
  )

}

export default Toggle