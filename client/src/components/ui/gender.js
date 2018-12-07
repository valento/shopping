import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Gender extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lan: {
        en: ['W','M'],
        es: ['M','H']
      },
      domain: this.props.domain
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick = () => {
    this.props.onDomain(this.props.gender)
  }

  render() {
    const { lan } = this.state
    const l = lan[this.props.lan]
    const gen = (this.props.gender)? 'm' : 'w'
    const style = (this.props.gender === this.props.domain)? 'domain' : ''
    return (
      <Link to={'/fashion/' + gen} onClick={this.onClick}>{l[this.props.gender]}</Link>
    )
  }
}

Gender.propTypes = {
  domain: PropTypes.number.isRequired
}

const mapStateToProps = state => {
  return {
    domain: state.settings.domain
  }
}

export default connect(mapStateToProps)(Gender)
