import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'
import MannCard from '../ui/mannequin/card'

import { getListMann } from '../../actions/mann'
import Filters from '../ui/mannequin/filters'

class PlayHome extends React.Component {
  state = {
    loading: false,
    lan: {
      en: ['Play it','Like it','Support it','Rate it'],
      es: ['Play','Like','Aporte','']
    }
  }

  componentDidMount(){
    const gender = this.props.gender
    this.props.getListMann(gender)
  }

  render() {
    const { mannequins, lan, games } = this.props
    return (
      <div className='App-content'>
        <div className='mann-page'>
          <div className='mann-overlay vintage labeled'>
            <div class='filters'>
              <p className='paraf-big'>Mannequin Dolls</p>
              <Filters filters={false} lan={lan}/>
            </div>
            <ul>
              {
                mannequins.map( (entry,i) => {
                  const ttl_style = (i % 2)? 'l' : 'r'
                  const img_style = (i % 2)? 'r' : 'l'
                  const bkg = {
                    background: `url(/img/mannequin/l_100${entry.uid}.png)`,
                    backgroundPosition: (i % 2)? 'right' : 'left',
                    backgroundRepeat: 'no-repeat'
                  }
                  return (
                    <MannCard
                      entry={entry} bkg={bkg}
                      language={lan}
                      onMann={this.onMann}
                      games={games}
                      img_style={img_style} ttl_style={ttl_style}
                    />
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
  lan: state.settings.language || state.user.language,
  mannequins: state.data,
  games: state.games
})

export default connect(mapStateToProps,{getListMann})(PlayHome)
