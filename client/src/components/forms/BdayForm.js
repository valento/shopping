import React from 'react'
import { Form,Button,Divider,Message,Input } from 'semantic-ui-react'

export default class BdayForm extends React.Component {
  state = {
    data: {},
    messages: {},
    ui: {
      en: ['dd','mm','Save B-day','Your B-Day:','Day is invalid... Check again!','Month is invalid... Check again!'],
      es: ['dd','mm','Guardar Fecha','Tu Cumpleaños:','Dia invalido... Revise bien!','Mes invalido... Revise bien!']
    },
    dom: [30,28,31,30,31,30,31,31,30,31,30,31]
  }

  onChange = (e, {name,value}) => {
    const {ui} = this.state
    const {lan} = this.props
    this.setState({
      ...this.state, data: {...this.state.data, [name]:Number(value)}
    })
  }

  submit = () => {
    const {ui,messages,data,dom} = this.state
    let vm = false,
        vd = false
    const {lan} = this.props
    vm = (data.month>12 || data.month<1)? false : true
    vd = (data.day>dom[data.month-1] || data.day<1)? false : true
    if(vm && vd) {
      this.props.onBday(data)
    }
  }

  render() {
    const { lan,onBday } = this.props
    const { data,dom } = this.state
    const { day,month } = data
    let vm = (month>12 || month<1 || month === '')? false : true
    let vd = (day>dom[month-1] || day<1 || day === '')? false : true
    let msg = !vm? 5 : 4
    const ui = this.state.ui[lan]
    return (
      <Form inline onSubmit={this.submit}>
        <p className='ttl'>{ui[3]}</p>
        <Form.Input width={5} placeholder={ui[1]} type='number'
            onChange={this.onChange} name='month' value={month || ''}
        />
        <Form.Input width={5} placeholder={ui[0]} type='number'
            onChange={this.onChange} name='day' value={day || ''}
        />
        {!(vd && vm) && <Message color='yellow' size='mini' content={ui[msg]}/>}
        <div className='row feature'>
          <Button basic fluid inverted
            type='submit' content={ui[2]}
            disabled={!vm || !vd || month === undefined || day === undefined}
          />
        </div>
      </Form>
    )
  }
}
