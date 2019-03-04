import React from 'react'
import { connect } from 'react-redux'
import CrowdFundUs from '../ui/CrowdFundUs'
import LikeButton from '../ui/like'

class MannequinComming extends React.Component {
  state = {
    bkg: {
      background: `url(/img/mannequin/mann_bkg_100${this.props.match.params.uid}.jpg)`,
      backgroundClor: 'rgb(230,215,220)'
    }
  }

  render(){
    const id = this.props.data.findIndex( entry => {
      return entry.uid === Number(this.props.match.params.uid)
    })
    return (
      <div className='App-content none'>
        <div className='comming' style={this.state.bkg}>
          <LikeButton type='coming' size='small' lan={this.props.lan} likes={this.props.data[id].rest.likes}/>
          <CrowdFundUs type='coming' lan={this.props.lan} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lan: state.settings.language,
  data: state.data
})

export default connect(mapStateToProps)(MannequinComming)
//Comming Up {props.match.params.uid}
