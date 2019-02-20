import React from 'react'
import { Button, Label, Icon, Divider, Accordion } from 'semantic-ui-react'

export default class CrowdFundUs extends React.Component {
  state = {
    open: false,
    activeIndex: false,
    lan: {
      es: {
        ui: ['Apóyenos','Ayudanos a mantener este proyecto vivo','Porque voy hacer esto?',
          'El Mannequin es el proyecto piloto de ua serie de applicaciones entorno personalidades \
          catalizadoras. Con este proyecto intento poner el inicio del Club Catalista, \
          y entretener, provocar, revelar y catalizar con la energia que siempre he podido \
          irradiar alrededor mío. Bienvenido, espero que lo disfrute!'
        ],
        faq: [
          {
            q: 'Es la única manera!',
            ans: 'El Club de Catalistas es nuevo y exclusivo. Y Tu, acabas de entrar! \
                  Los Catalistas del mundo se estan juntando y pronto este club será el nuevo Vaticano. \
                  Aún: Tu rating esta en ZERO (0) - apóyenos para elevar en "Fan" o "VIP" para no perder \
                  lo más exitante. Es un pequeno esfuerzo y... No se arepentirá!'},

          {
            q: 'Andar en mis zapatos!',
            ans: 'Si deseas compartir mis dias, mis ilusiones y visiones, mis vuelos del alma - \
                  estas en el sitio correcto - apóyenos para seguir este paseo'},

          {
            q: 'Mi Arte es la Vida!',
            ans: 'Fashion, Atitud y Energía en forma de fotos, videos, fiestas y siestas, gran \
                  variedad de producciones excusivas en lugares lejanos y exóticos - es todo lo \
                  que tengo que ofrecer. Apóyenos para estar al día con todo esto!'
          }
        ]
      },
      en: {
        ui: ['Support Us','Click here, please to keep this project alive','Why should I do that?'],
        faq: []
      }
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  openFaq = e => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const { ui, faq } = this.state.lan[this.props.lan]
    const { open, activeIndex } = this.state
    return(
      <div className='signup vintage'>
        <span className='paraf-narative'>
          {ui[3]}
        </span>
        <Divider horizontal> * * * </Divider>
        <p className='paraf-big'>{ui[1]}</p>
        <Button fluid icon='undo' color='blue' content={ui[0]} />
        <Label as='a' onClick={this.openFaq} basic color='red' inverted='true' size='big' pointing> {ui[2]} </Label>
        <Divider horizontal> * * * </Divider>
        {open &&
          <Accordion fluid styled>
            {faq.map((f, i) => {
              return (
                <div>
                  <Accordion.Title active={activeIndex === i+1}
                    index={i+1}
                    onClick={this.handleClick}
                    className='accordion-white-title'>
                    <Icon name='dropdown' />
                      {f.q}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === i+1}>
                    <span className='paraf-narative'>
                      {f.ans}
                    </span>
                  </Accordion.Content>
                </div>
              )})
            }
          </Accordion>
        }
      </div>
    )
  }
}
