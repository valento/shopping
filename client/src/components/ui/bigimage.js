import React from 'react'
import Linter from './linter'
import BigImageFeatures from './BigImageFeatures'

const BigImage = ({indx,gallery,onSubmenu,onMenu}) => {
  return (
    <div className='big-image'>
      <Linter onMenu={onMenu} big={true} onFilter={()=>{}}/>
      <img src={'/img/gallery/'+gallery[indx].name+'.jpg'} alt='img'/>
      <BigImageFeatures indx={indx} id={gallery[indx].uid} onSubmenu={onSubmenu} />
    </div>
  )
}

export default BigImage
