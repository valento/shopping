import React from 'react'
import {connect} from 'react-redux'

import Navigation from '../ui/navigation'
import CalendarGame from '../games/calendar/CalendarGame'

class CalendarPage extends React.Component {
  state = {
    ui: {
      en: ['Calendar Page:'],
      es: ['Calendario:']
    }
  }
  render() {
    const { lan } = this.props
    const ui = this.state.ui[lan]
    return(
      <div className='content-page calendar vintage'>
        <Navigation lan={lan} gen={true}/>
        <CalendarGame lan={lan} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lan: state.settings.language
})
export default connect(mapStateToProps)(CalendarPage)
