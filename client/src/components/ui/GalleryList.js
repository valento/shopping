import React from 'react'

const GalleryList = ({gallery}) => {
    return (
      <ul>
        {gallery.map( entry => {
          return(
            <div className='thumb'>
              <img src={'/img/gallery/'+entry.name+'.jpg'} alt='img'/>
            </div>
          )
        })}
        <div className='thumb'>
          <span>+more</span>
        </div>
      </ul>
    )
}

export default GalleryList
