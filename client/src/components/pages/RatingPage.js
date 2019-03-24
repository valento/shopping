import React from 'react'
import CrowdFundUs from '../ui/CrowdFundUs'

export default class RatingPage extends React.Component {
  state = {}

  render() {
    return(
      <div className='home-page'>
        Donate
        <CrowdFundUs lan={this.props.lan} />
      </div>
    )
  }
}
