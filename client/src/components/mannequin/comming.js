import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CrowdFundUs from '../ui/CrowdFundUs'
import LikeButton from '../ui/like'

class MannequinComming extends React.Component {
  state = {
    bkg: {
      background: `url(/img/mannequin/mann_bkg_100${this.props.match.params.uid}.jpg)`,
      backgroundClor: 'rgb(230,215,220)'
    },
    ui: {
      es: ['Volver'],
      en: ['Back to Mannequins']
    }
  }

  render(){
    const { ui, bkg } = this.state
    const { lan, data, match } = this.props
    const id = data.findIndex( entry => {
      return entry.uid === Number(match.params.uid)
    })
    return (
      <div className='App-content none'>
        <div className='man-page comming' style={bkg}>
          <div className='downed'>
            <Link to='/mannequin' className='vintage social'>&larr;{ui[lan][0]}</Link>
            <LikeButton type='coming' size='small' lan={lan} likes={data[id].rest.likes}/>
            <div className='clear'></div>
            <CrowdFundUs type='coming' lan={lan} />
          </div>
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
