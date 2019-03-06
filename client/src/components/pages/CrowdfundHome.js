import React from 'react'
import {connect} from 'react-redux'
import CrowdFundUs from '../ui/CrowdFundUs'

class CrowdfundHome extends React.Component {
  render() {
    return (
      <div className='App-content man'>
        <div className='home-page padded'>
          <CrowdFundUs lan={this.props.lan} type='full'/>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  lan: state.settings.language,
})
export default connect(mapStateToProps)(CrowdfundHome)
