import React from 'react'

const Mann = ({style,focus,path,store,k,items}) => {
  return (
    <div className='body-parts' style={style}>
      <img src={path + store[k].items[0]} />
    </div>
  )
}

export default Mann
