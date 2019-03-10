import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CrowdFundUs from '../ui/CrowdFundUs'
import LikeButton from '../ui/like'
import { updateLikes, socAction } from '../../actions/games'

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

  onSoc = action => {
    const {uid} = this.props
    let act = action === 'likes'? 'like' : action
    console.log(action, act)
    let social = {}
    social[act.toString()] = 1
    this.props.updateLikes(this.props.match.params.uid,social)
    this.props.socAction({user_id: uid, mann_id: this.props.match.params.uid, [action]: 1})
  }

  render(){
    const { ui, bkg } = this.state
    const { lan, data, match, games } = this.props
    const id = data.findIndex( entry => {
      return entry.uid === Number(match.params.uid)
    })
    return (
      <div className='App-content none'>
        <div className='man-page comming' style={bkg}>
          <div className='downed'>
            <Link to='/mannequin' className='vintage social'>&larr;{ui[lan][0]}</Link>
            <LikeButton type='interested' size='small' lan={lan}
              social={games[match.params.uid]}
              likes={data[id].rest.likes}
              onSoc={this.onSoc}
            />
            <div className='clear'></div>
            <CrowdFundUs type='coming' onSoc={this.onSoc} lan={lan} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lan: state.settings.language,
  uid: state.user.uid,
  data: state.data,
  games: state.games
})

export default connect(mapStateToProps, { updateLikes, socAction })(MannequinComming)
//Comming Up {props.match.params.uid}
