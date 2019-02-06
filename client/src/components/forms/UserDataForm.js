import React from 'react'
import { Form, Button, Icon, Divider } from 'semantic-ui-react'

export default class UserDataForm extends React.Component {

    state = {
      lan: {
        es: ['Porfavor, ayudame conocerle mejor','usuario','genero'],
        en: ['Please, help me know you better','username','gender']
      },
      ns: 0,
      ss: 0,
      sex: false,
      uname: false,
      min: 6,
      data: {},
      price: 3
    }

  onClick = (e, {name, index}) => {
    const {price} = this.state
    this.setState({
      data: {...this.state.data, [name]: index},
      sex: true,
      ss: price
    })
  }

  onChange = (e, {name,value}) => {
    const {price} = this.state
    let username_long_enough = false
    if(value.length > 6) {
      username_long_enough = true
    } else {
      username_long_enough = false
    }
    this.setState({
      data: {...this.state.data, [name]: value},
      uname: username_long_enough,
      ns: username_long_enough ? price : 0
    })
  }

  onSave = () => {
    const { credit,email } = this.props.user
    const {ns,ss} = this.state// uname,sex
    const score = ns + ss + credit
    const data = Object.assign(this.state.data, {credit: score, email: email})
    //console.log(data)
    this.props.addCredits(this.state.data)
    this.setState({
      ns: 0,
      ss: 0
    })
  }

  render() {
    const l = this.state.lan[this.props.language]
    const {ns,ss,min,price} = this.state// uname,sex
    const score = ns + ss
    const { gender } = this.state.data
    const { user } = this.props
    let nless = (user.username === null || user.username === 'indefined') ? price : 0
    let sless = (user.gender === null || user.gender === 'undefined') ? price : 0
    let minimum = min - nless - sless
    //console.log(minimum)
    //const { email } = this.props
    return(
      <div className='signup mail'>
        <p>{l[0]}</p>
        <Form>
          <Divider horizontal className='promo'>{l[1]}</Divider>
          <Form.Input onChange={this.onChange} fluid inline centered focus
            name='username'
            type='username'
            disabled={user.username !== null}
            placeholder={user.username ? user.username : 'Username: Anon'}
          />
          <Divider horizontal className='promo'>{l[2]}</Divider>
          <Button.Group icon color='black'>
            <Button onClick={this.onClick} disabled={user.gender !== null} name='gender' index={1} >
              <Icon name='man' size='big' color={gender === 1 || user.gender === 1 ? 'blue' : ''} />
            </Button>
            <Button onClick={this.onClick} disabled={user.gender !== null} name='gender' index={2} >
              <Icon name='woman' size='big' color={gender === 2 || user.gender === 2 ? 'blue' : ''} />
            </Button>
          </Button.Group>
          <Divider horizontal />
          <Button onClick={this.onSave} fluid color='black' disabled={score < min}>Save | +{score} Credits</Button>
        </Form>
      </div>
    )
  }
}
