import React from 'react'
import Linter from '../ui/linter'
import { Link } from 'react-router-dom'

import GalleryThumb from '../ui/gall_thumb'

const GalleryList = ({gallery, onThumb, onFilter, membership}) => {
  const scale = {
    width: `100vw`,
    overflow: `visible`
  }
    return (
      <ul>
        <Linter onFilter={onFilter} membership={membership} filters={false}/>
        <div className='clear'></div>
        {gallery.map( (entry,i) => {
          return(
            <GalleryThumb ind={i} onThumb={onThumb} entry={entry} />
          )
        })}
        <div className='thumb'>
          <Link to='/access/16'>+more</Link>
        </div>
      </ul>
    )
}

export default GalleryList
