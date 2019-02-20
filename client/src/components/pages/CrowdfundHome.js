import React from 'react'
import CrowdFundUs from '../ui/CrowdFundUs'
import {connect} from 'react-redux'

class CrowdfundHome extends React.Component {
  render() {
    return (
      <div className='App-content man'>
        <div className='home-page padded'>
          <CrowdFundUs lan={this.props.lan} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  lan: state.user.language || state.settings.language,
})
export default connect(mapStateToProps)(CrowdfundHome)
