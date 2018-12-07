import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import Validator from 'validator'

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      logging: false,
      errors: {}
    }
  }

  onSubmit = () => {
    const errors = this.validate(this.state.data)
    this.setState({ errors })
    if(Object.keys(errors).length === 0) this.props.submit(this.state.data)
  }
  validate(data) {
    const errors = {}
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email! Try again...'
    return errors
  }

  onInput = e => {
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value}
    })
  }

  render() {
    return (
      <div className='signup mail'>
        <Form onSubmit={this.onSubmit}>
          <Form.Input fluid required inline centered focus
            onChange={this.onInput}
            name='email'
            type='email'
            placeholder='example@email.com'
          />
          <Button color='black'>Signup</Button>
        </Form>
      </div>
    )
  }
}
