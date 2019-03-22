import React from 'react'

const GalleryThumb = ({entry,onThumb}) => {

  return (
    <div className='thumb' onClick={ () => {onThumb(entry.uid)} } >
      <img src={'/img/gallery/'+entry.name+'.jpg'} alt='img'/>
    </div>
  )
}

export default GalleryThumb
