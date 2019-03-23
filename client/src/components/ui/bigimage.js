import React from 'react'

const BigImage = ({indx,gallery}) => {
  return (
    <div className='big-image'>
      <img src={'/img/gallery/'+gallery[indx].name+'.jpg'} alt='img'/>
    </div>
  )
}

export default BigImage
