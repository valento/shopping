import React from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import Validator from 'validator'

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      logging: false,
      errors: {},
      ui: {
        es: ['Suscribir','ejemplo@mail.com','mi-clave-segura','Guardar','Pon seguro, porfavor:'],
        en: ['Signup','example@mail.com','my-secret-password','Save','Lock that door, please:']
      }
    }
  }

  onSubmit = () => {
    const {data, errors} = this.state
    const err = this.validate(data)
    this.setState({ errors: err })
    if(!this.props.pass && Object.keys(err).length === 0) {
      this.props.submit(data,false)
    } else if(Object.keys(err).length === 0) {
      this.props.submit(data,true)
      //console.log(err.password, data)
    }
  }

  validate = data => {
    const errors = {}
    if ( this.props.pass ) {
      if (data.password.length < 8) {
        errors.password = 'Minimum password length must be 8 digits!'
      }
    } else {
      if(!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email address! Try again...'
      }
    }
    return errors
  }

  onInput = (e,{name}) => {
    this.setState({
      data: {...this.state.data, [name]: e.target.value}
    })
  }

  render() {
    const {ui,errors} = this.state
    const lan = ui[this.props.lan]
    return (
        <div className='signup mail'>
          {this.props.pass && <p className='paraf-mid'>{lan[4]}</p>}
          <Form onSubmit={this.onSubmit}>
            <Form.Input fluid required inline centered focus
              onChange={this.onInput}
              name={this.props.pass ? 'password' : 'email'}
              type={this.props.pass ? 'password' : 'email'}
              placeholder={this.props.pass ? lan[2] : lan[1]}
            />
            {Object.keys(errors).length>0 && <Message negative>
                <Message.Header>{this.props.pass? 'Incomplete password:' : 'Incorrect email:'}</Message.Header>
                <p>{this.props.pass? errors.password : errors.email}</p>
              </Message>
            }
            <Button fluid={this.props.pass} color={this.props.pass ? 'red' : 'black'}>{this.props.pass? lan[3] : lan[0]}</Button>
          </Form>
        </div>
    )
  }
}
