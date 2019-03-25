import React from 'react'
import { connect } from 'react-redux'
import { Message, Button, Divider } from 'semantic-ui-react'
import CrowdFundUs from '../ui/CrowdFundUs'

const AccessPage = ({lan, access, ...props}) => {
  const state = {
    ui: {
      es: ['Su Membresía (',') no le permite accesar este contenido!', 'Control de Acceso','! Bienvenido, ',
        ' Wow: Tu si puedes ver','Apoyenos', 'Su membresia es: ',
        'Debes elevar su membresia para accesar contenido exclusivo! Simple:',
        'Membresias'
      ],
      en: ['Your membership (',') isn\'t enough to access that content!', 'Access Control','! Wellcome, ',
        'Wow: You can watch this','Support us', 'Your membership is: ',
        'You must level up to see special content! Just: ',
        'Level Up'
      ]
    },
    level: {
      es: ['','','VIP','Fan','Miembro','Basico'],
      en: ['','','VIP','Fan','Member','Basic']
    }
  }

  return (
    (props.match.params.level<props.member)?
      (
        <div className='home-page padded vintage'>
          <Message warning>
            <Message.Header>{state.ui[lan][2]}</Message.Header>
            <p>{state.ui[lan][0].concat(state.level[lan][Math.log2(props.member)].concat(state.ui[lan][1]))}</p>
          </Message>
          <p>{state.ui[lan][7]}</p>
          <Divider horizontal className='promo'>{state.ui[lan][8]}</Divider>
          <Button
            fluid
            as='a'
            color='pink'
            content={('\u2618  ' + state.ui[lan][5])}
            href='https://www.indiegogo.com/projects/mannequin-doll/x/19109771#/'
          />
        </div>
      ) : (
        <div className='home-page padded vintage'>
          <Message warning>
            <Message.Header>{state.ui[lan][3].concat(props.username)}</Message.Header>
            <p>{state.ui[lan][4]}</p>
          </Message>
        </div>
      )
  )
}

const mapStateToProps = state => ({
  member: state.user.membership,
  username: state.user.username
})
export default connect(mapStateToProps)(AccessPage)
