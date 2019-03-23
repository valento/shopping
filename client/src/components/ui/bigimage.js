import React from 'react'
import Submenu from './submenu'

const BigImage = ({indx,gallery,onMenu}) => {
  return (
    <div className='big-image'>
      <Submenu onMenu={onMenu} />
      <img src={'/img/gallery/'+gallery[indx].name+'.jpg'} alt='img'/>
    </div>
  )
}

export default BigImage
