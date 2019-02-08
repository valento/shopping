import React from 'react'
import { Form, Input, Label, Button, Icon, Divider } from 'semantic-ui-react'
import Validator from 'validator'

export default class UserDataForm extends React.Component {

    state = {
      lan: {
        es: ['Porfavor, ayudame conocerle mejor', 'usuario',' genero', 'lenguaje:',
          'cumpleanos:', 'AAAA','MM','DD','Ano','Mes','Dia'
          ],
        en: ['Please, help me know you better', 'username', 'gender',
          'language:', 'bday:','yyyy','mm','dd','Year','Month','Day'
          ]
      },
      ns: 0,
      ss: 0,
      ls: 0,
      bs: 0,
      sex: false,
      uname: false,
      bday: false,
      lng: false,
      min: 6,
      data: {},
      price: 3,
      date: {
        year: '',
        month: '',
        day: ''
      }
    }

  onClick = (e, {name, index}) => {
    const {price} = this.state
    if(this.props.main_data){
      this.setState({
        data: {...this.state.data, [name]: index},
        sex: true,
        ss: price
      })
    } else {
      this.setState({
        data: {...this.state.data, [name]: index},
        lng: true,
        ls: price
      })
    }
  }

  onChange = (e, {name,value}) => {
    if(this.state.main_data) {
      this.setState({
        data: {...this.state.data, [name]: value},
      })
    } else {
      this.setState({
        date: {...this.state.date, [name]: value},
      })
    }
    this.validate(name,value)
  }

  validate(name,value) {
    const {price} = this.state
    const {main_data} = this.props
    let username_long_enough = false, min, max

    if(main_data) {
// Validate: USERNAME - GENDER form:
      min = 6
      max = 20
      username_long_enough = (Validator.isLength(value,{min: min, max: max})) ? true : false
      this.setState({
        uname: username_long_enough,
        ns: username_long_enough ? price : 0
      })
    } else {
// Validate: LANGUAGE - B-day form: ISO valid date
      const { year, month, day } = this.state.date
      const d = year.concat('-')
      console.log(year)

    }

  }

  onSave = () => {
    const { credit,email } = this.props.user
    const {ns,ss,bs,ls} = this.state// uname,sex
    const score = ns + ss + bs + ls + credit
    const data = Object.assign(this.state.data, {credit: score, email: email})
    //console.log(data)
    this.props.addCredits(this.state.data)
    this.setState({
      ns: 0,
      ss: 0
    })
  }

  render() {
    const l = this.state.lan[this.props.lan]
    const {ns,ss,ls,bs,min,price} = this.state// uname,sex
    const { gender } = this.state.data
    const { user, main_data } = this.props
    const score = main_data ? (ns + ss) : (bs + ls)
    let nless = (user.username === null || user.username === 'indefined') ? price : 0
    let sless = (user.gender === null || user.gender === 'undefined') ? price : 0
    let minimum = min - nless - sless
    //console.log(minimum)
    //const { email } = this.props
    return(
      <div className='signup'>
        <p>{l[0]}</p>
        {main_data ? (
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
            <Divider horizontal> * * * </Divider>
          </Form>

        ) : (
          <div>
            <div>
              <Divider horizontal className='promo'>{l[3]}</Divider>
              <Button.Group fluid color='black'>
                <Button onClick={this.onClick} name='language' index='en'>ENG</Button>
                <Button.Or />
                <Button onClick={this.onClick} name='language' index='es'>ESP</Button>
                <Button.Or />
                <Button onClick={this.onClick} name='language' index='de'>DEU</Button>
              </Button.Group>
            </div>
            <Divider horizontal className='promo'>{l[4]}</Divider>
            <Form className='bday'>
              <Form.Group inline>
                <Form.Field>
                  <Input onChange={this.onChange} name='year' type='number' placeholder={l[5]} />
                </Form.Field>
                <Form.Field>
                  <Input onChange={this.onChange} name='month' type='number' placeholder={l[6]} />
                </Form.Field>
                <Form.Field>
                  <Input onChange={this.onChange} name='day' type='number' placeholder={l[7]} />
                </Form.Field>
              </Form.Group>
            </Form>
            <Divider horizontal />
            <Button onClick={this.onSave} fluid color='black' disabled={score < min}>Save | +{score} Credits</Button>

          </div>
        )}
      </div>
    )
  }
}
