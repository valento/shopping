import React from 'react'
import Linter from '../ui/linter'

import GalleryThumb from '../ui/gall_thumb'

const GalleryList = ({gallery, onThumb, onFilter}) => {
  const scale = {
    width: `100vw`,
    overflow: `visible`
  }
    return (
      <ul>
        <Linter onFilter={onFilter} filters={false}/>
        <div className='clear'></div>
        {gallery.map( (entry,i) => {
          return(
            <GalleryThumb ind={i} onThumb={onThumb} entry={entry} />
          )
        })}
        <div className='thumb'>
          <span>+more</span>
        </div>
      </ul>
    )
}

export default GalleryList
