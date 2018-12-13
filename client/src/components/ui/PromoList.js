import React from 'react'
import { connect } from 'react-redux'

const PromoList = ({gender}) => {
  return (
    <div className='list'>
      <ul>
        <li>
          Promo.1
        </li>
        <li>
          Promo.2
        </li>
        <li>
          Promo.3
        </li>
      </ul>
    </div>
  )
}

export default connect(null)(PromoList)
