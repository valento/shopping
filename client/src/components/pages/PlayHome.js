import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Divider, Button, Icon } from 'semantic-ui-react'
 import { getListMann, activateMann, getMannResources } from '../../actions/mann'

class PlayHome extends React.Component {
  state = {
    loading: false,
    lan: {
      en: ['Play it'],
      es: ['Play']
    }
  }

  onMann = (e,{id,status}) => {
    if(status) {
      this.props.getMannResources(id)
    }
  }

  componentDidMount(){
    const gender = this.props.gender
    this.props.getListMann(gender)
  }

  render() {
    const { mannequins, language } = this.props
    const lan = this.state.lan[language]
    return (
      <div className='App-content'>
        <div className='mann-page'>
          <div className='mann-overlay vintage labeled'>
            <p className='paraf-big'>Mannequins:</p>
            <ul>
              {
                mannequins.map( (entry,i) => {
                  const ttl_style = (i % 2)? 'left' : 'right'
                  const img_style = (i % 2)? 'right' : 'left'
                  const title = 'title_'+language
                  const dscr = 'dscr_'+language
                  const bkg = {
                    background: `url(/img/mannequin/l_100${entry.uid}.png)`,
                    backgroundPosition: (i % 2)? 'right' : 'left',
                    backgroundRepeat: 'no-repeat'
                  }
                  return (
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
                              {lan[0]}
                            </Button>
                          <span>{entry.rest[dscr]}</span>
                        </div>
                    </li>
                  )
                })
              }
              <div className='clear'></div>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

PlayHome.propTypes = {
  mannequins: PropTypes.array.isRequired
}

 const mapStateToProps = state => ({
   gender: state.user.gender || state.settings.gender,
   language: state.user.language || state.settings.language,
   mannequins: state.data
 })
export default connect(mapStateToProps, { getListMann,activateMann,getMannResources })(PlayHome)
