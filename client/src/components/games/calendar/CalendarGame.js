import React from 'react'
import {connect} from 'react-redux'
import { bdayAdded } from '../../../actions/user'
import { Divider,Button } from 'semantic-ui-react'

import Calendar from './Calendar'
import Bday from './Bday'
import CalBkg from './CalBkg'

class CalendarGame extends React.Component {
  state = {
    ui: {
      en: ['Day', 'Month','Order'],
      es: ['Dia', 'Mes','Ordenar']
    }
  }

  onDate = (data) => {
    let user = {}
    console.log({data})
    this.setState({
      ...this.state, data
    })
    user.bday = data.month.toString().concat('-',data.day.toString())
    this.props.bdayAdded(user)
  }

  render() {
    const {lan} = this.props
    const ui = this.state.ui[lan]
    return (
      <div className='ui three column grid padded'>
        <div className='five wide column'>
          <Calendar lan={lan} d={(this.state.data && this.state.data.day) ? this.state.data.day : 0} />
        </div>
        <div className='central six wide column'>
          <Bday onDate={this.onDate} lan={lan} />
          <Divider></Divider>
          <CalBkg lan={lan} />
          <Divider></Divider>
          <Button content={ui[2]}
            disabled={!this.state.data || Object.keys(this.state.data).length === 0}
          />
        </div>
      </div>
    )
  }
}

export default connect(null, { bdayAdded })(CalendarGame)
