import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Icon, Divider, Segment } from 'semantic-ui-react'

const PromoList = ({ gender, loading, proms }) => {

  return (
    <div className='list'>
      {
        proms.map( item => {
          const ttl = !!item.header
          const hdr =  (ttl)? item.header : ''
          return (
            <Segment as={Link} to={'/proms/'+gender+'/'+item.promo_id} className={ttl ? '' : ''}>
              <h2>{ttl ? (item.title) : (<Divider horizontal>{item.title}</Divider>)}
              </h2>
              {(ttl)? (<span>{hdr}</span>) : ''}
            </Segment>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = state => ({
  proms: state.proms
})

export default connect(mapStateToProps)(PromoList)

/*
<Segment as={Link} to={'/proms/'+gender+'/'+id} className='ties'>
  <h2>30% off all ties <Icon name='arrow alternate circle right' /></h2>
  <span>promocion valida hasta agotar</span>
</Segment>
<Segment as={Link} to={'/proms/'+gender+'/'+id}>
  <Divider horizontal>old friends for sale</Divider>
</Segment>
<Segment as={Link} to={'/proms/'+gender+'/'+id}>
  <h2>Promo.3</h2>
</Segment>
*/
