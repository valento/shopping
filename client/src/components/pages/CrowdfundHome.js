import React from 'react'
import CrowdFundUs from '../ui/CrowdFundUs'
import {connect} from 'react-redux'

class CrowdfundHome extends React.Component {
  render() {
    return (
      <div className='home-page padded'>
        <CrowdFundUs lan={this.props.lan} />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  lan: state.user.language || 'es',
})
export default connect(mapStateToProps)(CrowdfundHome)
