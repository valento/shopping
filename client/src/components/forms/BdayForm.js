import React from 'react'
import { Form,Button,Divider } from 'semantic-ui-react'

export default class BdayForm extends React.Component {
  state = {
    data: {},
    ui: {
      en: ['day','month','Save'],
      es: ['dia','mes','Guardar']
    }
  }

  onChange = (e, {name,value}) => {
    this.setState({
      ...this.state, data: {...this.state.data, [name]:Number(value)}
    })
  }
  submit = () => {
    console.log(this.state.data)
    this.props.onBday(this.state.data)
  }

  render() {
    const { lan,onBday } = this.props
    const { data } = this.state
    const ui = this.state.ui[lan]
    return (
      <Form onSubmit={this.submit}>
        <p>Your B-Day:</p>
          <Form.Input width={10} placeholder={ui[1]} type='number'
            onChange={this.onChange} name='month' value={this.state.data.month || ''}
          />
          <Form.Input width={10} placeholder={ui[0]} type='number'
            onChange={this.onChange} name='day' value={this.state.data.day || ''}
          />
        <div className='row feature'>
          <Button basic fluid inverted
            type='submit' content={ui[2]}
            disabled={!data.hasOwnProperty('month') ||
            !data.hasOwnProperty('day') ||
            Object.values(data).reduce((a,b) => a + b, 0)<2}
          />
        </div>
      </Form>
    )
  }
}
