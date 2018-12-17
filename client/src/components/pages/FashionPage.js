import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Icon } from 'semantic-ui-react'
import AnyList from '../ui/AnyList'
import FashionMenu from '../ui/FashionMenu'
import SubmenuRoute from '../routes/SubMenu'
import PropTypes from 'prop-types'

class FashionHome extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { match } = this.props
    console.log('Fashion Page Gender: ', match.params.gender)
    const g = match.params.gender
    const bkg = (g > 1) ? 'woman' : 'man'
    return (
      <div className={'App-content ' + bkg}>
        <div className='content'>
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
  }
}

FashionHome.propTypes = {
  gender: PropTypes.number.isRequired
}

const mapStateToProps = state => {
  return {
    lan: state.settings.language,
    domain: state.settings.domain
  }
}

export default connect(mapStateToProps)(FashionHome)
