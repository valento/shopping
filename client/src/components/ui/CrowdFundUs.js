import React from 'react'
import { Link } from 'react-router-dom'
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
          irradiar alrededor mío. Bienvenido! y espero que lo disfrute...',
          'crowdfunding','próximamente'
        ],
        faq: [
          {
            q: 'Es la única manera!',
            ans: 'El Club de Catalistas es nuevo y exclusivo. Y Tu, acabas de entrar! \
                  Los Catalistas del mundo se estan juntando y pronto este club será el nuevo Vaticano. \
                  Aún: Tu rating esta en ZERO (0) - apóyenos para elevar en "Fan" o "VIP" para no perder \
                  lo más exitante. Es un pequeno esfuerzo y... No se arepentirá!'},

          {
            q: 'Ponte en mis zapatos!',
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
        ui: ['Support Us','Click here, please to keep this project alive','Why would I do that?',
            'This Mannequin Doll is just the pilot in a serie of micro-services dedicated to \
            "La Catalista" movement. It is also the beginning of The Catalist Club. More exciting \
            services are to be published. To follow me - click below and support this project!',
            'crowdfunding','Coming soon'
        ],
        faq: [
          {
            q:'It\'s the only way',
            ans: 'The Catalist Club is new, it\'s exclusive and it\'s growing.\
            You\'ve just got in, congratulations! Catalists are coming from all over the globe. \
            But: you are still a regular member! You need to become a "Fan" to see what\'s coming next \
            and you\'ll need a "VIP" membership if you don\'t want to miss the most exciding stuff. \
            So hurry up - supporting us will rise your rating! It won\'t harm you \
            it will be worth of every cent'

          },
          {
            q: 'To walk into my shoes...',
            ans: 'Walk with me across the globe. Sharing my days, my visions, my inspirations - \
            you are on the right place. Support us to keep that walk together!'
          },
          {
            q:'Make the Catalist',
            ans: 'Fashion, photography, video, partying or resting... you will have it all in here - \
            but it will be my way, "La Catalista" way! Support us to keep my thrilling productions \
            coming and to stay in touch'
          }
        ]
      }
    }
  }

  handleModalsOptions = (e, titleProps) => {
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
    let styles
    switch(this.props.type){
      case 'full' :
        styles = 'vintage'
      break
      case 'coming' :
        styles = 'vintage modal'
      break
    }
    return(
      <div className={styles}>
        { this.props.type === 'full' ?
          (
            <span className='paraf-narative'>
              {ui[3]}
            </span>
          ) :
          ''
        }
        <Divider horizontal className='promo'> {this.props.type === 'full' ? ui[4] : ui[5]} </Divider>
        <p className='paraf-big'>{ui[1]}</p>
        <Button fluid icon='undo' as='a' color='blue'
          content={ui[0]}
          onClick={()=>this.props.onSoc('supported')}
          href='https://www.indiegogo.com/projects/mannequin-doll/x/19109771#/'
        />
        <div className='clear'></div>
        {this.props.type === 'full' &&
          <Label as='a' onClick={this.openFaq} basic color='red'
            inverted='true' size='big' pointing>
            {ui[2]}
          </Label>}
        {this.props.type === 'full' && <Divider horizontal className='promo'> * * * </Divider>}

        {open &&
          <Accordion fluid styled>
            {faq.map((f, i) => {
              return (
                <div className='faq'>
                  <Accordion.Title active={activeIndex === i+1}
                    index={i+1}
                    onClick={this.handleModalsOptions}
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
