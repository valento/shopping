import React from 'react'
import { Link } from 'react-router-dom'

class Gender extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lan: {
        en: ['','M','W'],
        es: ['','H','M']
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
    const { gender } = this.props
    return (
      <Link to={'/fashion/' + gender} onClick={this.onClick}>{l[gender]}</Link>
    )
  }
}

export default Gender
