import React from 'react'
import { connect } from 'react-redux'

class BodyCursor extends React.Component {
  render() {
    const ttl = this.props.body ? `Dress your ${body}` : `Tap this body to get dressed`
    return (
      <div className='mnq-menu'>{ttl}</div>
    )
  }
}

const mapStateToProps = state => {
  //mannequin
}

export default connect(mapStateToProps)(BodyCursor)
