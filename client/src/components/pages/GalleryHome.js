import React from 'react'

const GalleryHome = props => {
  const deadline = new Date('2019-04-10T00:24:00')
  const now = new Date()
  const rm = new Date(deadline-now)
  return (
    <div className='App-content'>
      <div className='general'>
        <h2>Gallery is Empty for now!</h2>
        <p>Come back in: </p>
        <span className='digital'>{rm.getDate()} days : {rm.getHours()} hours : {rm.getMinutes()} minutes</span>
      </div>
    </div>
  )
}

export default GalleryHome
