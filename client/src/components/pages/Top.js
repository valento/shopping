import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Sign from '../brand/sign'
import Gender from '../ui/gender'
import UserAccount from '../ui/user'

import { getStore, switchDomain, changeCategory } from '../../actions/'

class Top extends React.Component {
  constructor(props) {
    super(props)
    this.onSwitchDomain = this.onSwitchDomain.bind(this)
  }

  componentDidMount(){
    this.props.getStore(this.props.domain)
  }

  onSwitchDomain(domain) {
    this.props.switchDomain(domain)
    this.props.changeCategory(0)
    this.props.getStore(domain)
  }
  render() {
    const { lan,user } = this.props
    return (
      <div className='ui grid padded App-menu'>
          <div className='six wide column'>
            <Link to='/'><Sign fontsize={20} /></Link>
          </div>
          <div className='four wide column centered'>
            <Gender onDomain={this.onSwitchDomain} gender={1} lan={lan} />
            <span> | </span>
            <Gender onDomain={this.onSwitchDomain} gender={2} lan={lan} />
          </div>
          <div className='six wide column centered'>
            <UserAccount credit={user.credit} />
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    lan: state.settings.language,
    domain: state.settings.domain,
    user: state.user
  }
}

export default connect(mapStateToProps, { getStore, switchDomain, changeCategory })(Top)
