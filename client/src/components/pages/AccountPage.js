import React from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../../actions'
import PropTypes from 'prop-types'

class AccountHome extends React.Component {
  state = {
    ui: {
      es: ['Esto es lo que tiene, '],
      en: ['Here is what you have, ']
    }
  }
  render() {
    const { username,credit } = this.props.user
    const { language } = this.props
    const lan = this.state.ui[language]
    return (
      <div className='App-content user-page'>
        <div className='home-page'>
          <h2>{lan[0] + username}</h2>
          <p>{credit}</p>
          <div>
            <h2>Tome mas:</h2>
          </div>
        </div>
      </div>
    )
  }
}

AccountHome.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    gender: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired,
    credit: PropTypes.number.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  language: state.settings.language,
  user: state.user
})

export default connect(mapStateToProps,{ updateUser })(AccountHome)
