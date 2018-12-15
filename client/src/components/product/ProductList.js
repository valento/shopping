import React from 'react'
import { connect } from 'react-redux'

const ProductList = props => {
  return (
    <div className={'App-content man'}>
      <div className='home-page vintage'>
        <h1>Products List</h1>
      </div>
    </div>
  )
}

export default connect(null)(ProductList)
