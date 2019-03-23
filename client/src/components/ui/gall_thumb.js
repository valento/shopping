import React from 'react'

const GalleryThumb = ({entry,onThumb,ind}) => {

  return (
    <div className='thumb' onClick={ () => {onThumb(entry.uid,ind)} } >
      <img src={'/img/gallery/'+entry.name+'.jpg'} alt='img'/>
    </div>
  )
}

export default GalleryThumb
