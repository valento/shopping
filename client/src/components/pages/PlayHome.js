import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Divider, Button, Icon } from 'semantic-ui-react'
 import { getListMann, activateMann } from '../../actions/mann'

class PlayHome extends React.Component {
  state = {
    loading: false
  }

  componentDidMount(){
    const gender = this.props.gender
    this.props.getListMann(gender)
  }

  render() {
    const { mannequins, language } = this.props
    return (
      <div className='App-content'>
        <div className='mann-page'>
          <div className='mann-overlay vintage labeled'>
            <p className='paraf-big'>Mannequins</p>
            <ul>
              {
                mannequins.map( (entry,i) => {
                  const ttl_style = (i % 2)? 'left' : 'right'
                  const img_style = (i % 2)? 'right' : 'left'
                  const title = 'title_'+language
                  const img = `/img/mannequin/l_100${entry.uid}.png`
                  return (
                    <li key={entry.uid}>
                        <div className={ttl_style}>
                          {entry.rest[title]}
                          <Button id={entry.uid} as={Link} to={'/mannequin/'+entry.uid}>
                            Watch this
                          </Button>
                        </div>
                        <img className={img_style} src={img}/>
                    </li>
                  )
                })
              }
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

PlayHome.propTypes = {
  data: PropTypes.array.isRequired
}

 const mapStateToProps = state => ({
   gender: state.user.gender || state.settings.gender,
   language: state.settings.language,
   mannequins: state.data
 })
export default connect(mapStateToProps, { getListMann,activateMann })(PlayHome)
