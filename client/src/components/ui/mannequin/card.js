import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button,Icon } from 'semantic-ui-react'
import SocialBar from '../social'
import { getMannResources } from '../../../actions/mann'
import { getSocialData } from '../../../actions/games'

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
    }
  }

  componentDidMount() {
    const {uid} = this.props.entry
    console.log('Mann Card Mounted with: ',uid)
    this.props.getSocialData(uid,'likes')
    .then(res => console.log('MannCard: ',res))
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

export default connect(null,{ getMannResources, getSocialData })(MannCard)
