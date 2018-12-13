import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Icon, Divider } from 'semantic-ui-react'
//import PropTypes from 'prop-types'

export default class UserDataForm extends React.Component {

    state = {
      ns: 0,
      ss: 0,
      sex: false,
      uname: false,
      min: 6,
      data: {
        username: this.props.username,
        gender: this.props.gender,
        language: this.props.language,
        email: this.props.email
      }
    }

  onClick = (e, {name, index}) => {
    this.setState({
      data: {...this.state.data, [name]: index},
      sex: true,
      ss: 3
    })
  }

  onChange = (e, {name,value}) => {
    let username_long_enough = false
    if(value.length > 6) {
      username_long_enough = true
    } else {
      username_long_enough = false
    }
    this.setState({
      data: {...this.state.data, [name]: value},
      uname: username_long_enough,
      ns: username_long_enough ? 3 : 0
    })
  }

  onSave = () => {
    const {ns,ss} = this.state
    const credit = ns + ss
    //const data = Object.assign(this.state.data, {credit: credit})
    console.log(this.state.data)
    this.props.onSave(this.state.data)
  }

  render() {
    const {uname,sex,ns,ss,min} = this.state
    const {username,gender} = this.state.data
    let minimum = min - ((gender === null || gender === 'undefeined') ? 3 : 0)
    minimum = min - ((username === null || username === 'indefined') ? 3 : 0)
    const { email } = this.props
    return(
      <div className='signup mail'>
        <Form>
          <Divider horizontal className='promo general'>Username</Divider>
          <Form.Input onChange={this.onChange} fluid inline centered focus
            name='username'
            type='username'
            disabled={username !== null || username !== 'indefined'}
            placeholder={username ? username : 'Username: Anon'}
          />
          <Divider horizontal className='promo general'>Gender</Divider>
          <Button.Group icon color='black'>
            <Button onClick={this.onClick} disabled={!(gender < 0)} name='gender' index={1} >
              <Icon name='man' size='big' color={gender === 1 ? 'blue' : ''} />
            </Button>
            <Button onClick={this.onClick} disabled={!(gender < 0)} name='gender' index={0} >
              <Icon name='woman' size='big' color={gender === 0 ? 'blue' : ''} />
            </Button>
          </Button.Group>
          <Divider horizontal />
          <Button onClick={this.onSave} fluid color='black' disabled={ns+ss < minimum}>Save | +{ns+ss} Credits</Button>
        </Form>
      </div>
    )
  }
}
