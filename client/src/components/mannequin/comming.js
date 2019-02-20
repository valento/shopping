import React from 'react'

const MannequinComming = props => {
  const bkg = {
    background: `url(/img/mannequin/mann_bkg_100${props.match.params.uid}.png)`,
    backgroundClor: 'rgb(230,215,220)'
  }
  return (
    <div className='App-content'>
      <div className='comming' style={bkg}>
        <div className='mann-overlay commming'>
          Comming Up {props.match.params.uid}
        </div>
      </div>
    </div>
  )
}
export default MannequinComming
