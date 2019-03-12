import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import AnyList from '../ui/AnyList'
import FashionMenu from '../ui/FashionMenu'
import SubmenuRoute from '../routes/SubMenu'
import PropTypes from 'prop-types'

class FashionHome extends React.Component {

  render() {
    const { match, closed } = this.props
    console.log('Fashion Page Gender: ', match.params.gender)
    const g = match.params.gender
    const bkg = (g > 1) ? 'woman' : 'man'
    const ttl = (g > 1) ? 'Woman' : 'Man'
    const deadline = new Date('2019-04-10T00:24:00')
    const now = new Date()
    const rm = new Date(deadline-now)
    return (
      closed ? (
        <div className={'App-content ' + bkg}>
          <div className="desktop">
            <h2>{ttl} Store is under construction!</h2>
            <p>Come back in:</p>
            <span className='digital'>{rm.getDate()} days : {rm.getHours()} hrs : {rm.getMinutes()} min</span>
          </div>
        </div>
      ):(
        <div className={'App-content ' + bkg}>
          <div className='contents'>
            <div className='submenu'>
              <SubmenuRoute location={this.props.location} path={match.url}
                gen={g}
                component={FashionMenu}
              />
            </div>
            <Switch>
              <Route path={match.url} component={AnyList}/>
              <Route path={`${match.url}/:category`} component={AnyList}/>
            </Switch>
          </div>
        </div>
      )
    )
  }
}

FashionHome.propTypes = {
  gender: PropTypes.number.isRequired,
  closed: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    lan: state.settings.language,
    domain: state.settings.domain,
    closed: state.settings.closed
  }
}

export default connect(mapStateToProps)(FashionHome)
