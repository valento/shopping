import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Icon } from 'semantic-ui-react'
import ProductList from '../ui/ProductList'
import FashionMenu from '../ui/FashionMenu'
import SubmenuRoute from '../routes/SubMenu'

class FashionHome extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { match } = this.props
    //console.log(match)
    const g = match.params.gender
    const bkg = (g === 'm')? 'man' : 'woman'
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
            <Route path={match.url} component={ProductList}/>
            <Route path={`${match.url}/:category`} component={ProductList}/>
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    lan: state.settings.language
  }
}

export default connect(mapStateToProps)(FashionHome)
