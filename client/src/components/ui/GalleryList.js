import React from 'react'
import Linter from '../ui/linter'
import { Link } from 'react-router-dom'

import GalleryThumb from '../ui/gall_thumb'

const GalleryList = ({gallery, onThumb, onFilter, membership}) => {
    return (
      <div>
        <Linter big={false} onFilter={onFilter} membership={membership} filters={false}/>
        <div className='clear'></div>
        <ul>
          {gallery.map( (entry,i) => {
            return(
              <GalleryThumb ind={i} onThumb={onThumb} entry={entry} />
            )
          })}
          <div className='thumb'>
            <Link to='/access/16'>+more</Link>
          </div>
        </ul>
      </div>
    )
}

export default GalleryList
