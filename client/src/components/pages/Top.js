import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { DOMAIN_CHANGED } from '../../types'
import '../../App.css'
import Sign from '../brand/sign'
import Gender from '../ui/gender'
import User from '../ui/user'

class Top extends React.Component {
  constructor(props) {
    super(props)
    this.switchDomain = this.switchDomain.bind(this)
  }

  switchDomain(d) {
    console.log('Top Component: ', d)
    this.props.onSwitchDomain(d)
  }
  render() {
    return (
      <header className='App-menu ui grid padded'>
          <div className='six wide column'>
            <Link to='/'><Sign fontsize='20' /></Link>
          </div>
          <div className='four wide column centered'>
            <Gender onDomain={this.switchDomain} gender={1} lan={this.props.lan} />
            <span> | </span>
            <Gender onDomain={this.switchDomain} gender={0} lan={this.props.lan} />
          </div>
          <div className='six wide column centered'>
            <User lan={this.props.lan} />
          </div>
      </header>
    )
  }
}

const mapStateToProps = state => {
  return {
    lan: state.settings.language,
    domain: state.settings.domain
  }
}

export default connect(mapStateToProps,
  dispatch => ({
  onSwitchDomain: domain => dispatch({ type: DOMAIN_CHANGED, domain })})
)(Top)
