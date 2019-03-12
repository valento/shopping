import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button,Icon } from 'semantic-ui-react'
import SocialBar from '../social'
import { getMannResources } from '../../../actions/mann'
import { getSocialData, socAction } from '../../../actions/games'

class MannCard extends React.Component {
  state = {
    loading: false,
    lan: {
      en: ['Play it','Like it','Support it','Rate it'],
      es: ['Play','Like','Aporte','']
    }
  }

  onMann = (e, {id,status}) => {
    if(status) {
      this.props.getMannResources(id)
      this.props.socAction({user_id: this.props.user.uid, mann_id: id, played: 1})
    }
  }

  componentDidMount() {
    const {uid} = this.props.entry
    this.props.getSocialData(uid,'likes')
  }

  render() {
    const {entry,bkg,ttl_style,img_style,language,games} = this.props
    const ui = this.state.lan[language]
    const title = 'title_'+language
    const dscr = 'dscr_'+language

    return(
      <li key={entry.uid} style={bkg}>
          <div className={ttl_style + ' grid list'}>
            <p>{entry.rest[title]}</p>
            <Button icon fluid color='black'
              onClick={this.onMann}
              id={entry.uid} as={Link}
              status={entry.rest.c_status===4}
              to={entry.rest.c_status===4 ? '/mannequin/'+entry.uid :
              '/mannequin/comming/'+entry.uid}
            >
            <Icon name='play circle outline'/>
            {ui[0]}
            </Button>
            <span>{entry.rest[dscr]}</span>
            <SocialBar id={entry.uid}
              social={games[entry.uid]}
              likes={entry.rest.likes} simple={true}
              rating={entry.rest.rating} lan={language}
            />
          </div>
      </li>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps,{ getMannResources, getSocialData, socAction })(MannCard)
