import React from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Icon } from 'semantic-ui-react'
import { changeLayer, changeBody, getResource } from '../../actions/mann'

import Mannequin from '../mannequin/Mannequin'
import Controls from '../ui/mannequin/controls'
import Options from '../ui/mannequin/options'
import Arrows from '../ui/mannequin/arrows'
import MannHelp from '../ui/mannequin/helper'

class MannequinHome extends React.Component {
  state = {
  //Active body part:
    part: '',
    level: -1,
    count: 0,
    index: 0,
    mannequin: {
      uid: 0
    },
  // Dresses On Stage
    settings: {
// Mouse Zones in % for: 412x736 (iPhone X,8+,7+) || 360x740 (Samsung) || 375x667 (iPhone 6,7,8) || more ??
      zone: [25,45,60,82,100],
  // Controls coordinates:
      pointer: 250,
      helper: false,
      item: ['head','corp','waist','legs','feet'],
      layer: ['top','over','main','under','skin'],
      modal: false,
      modal_mode: -1
    },
    ui: {
      modal_modes: ['save','share','clear','help'],
      es: [
        'Guardar este Mannequin?', 'Enviar tu Mannequin a nuestro Instagram?',
        'Limpiar que cosa?', 'Si', 'No', 'Lo tengo claro!'
      ],
      en: [
        'Save this Mannequin?', 'Share this on our Instagram?', 'Clear what?',
        'Yes', 'No', 'Got it!'
      ]
    }
  }

  onOption = ( e, o ) => {
    let f, i
    const { zone, item } = this.state.settings
    const H = window.screen.height

    if(o) {
      i =  o
      f = H*zone[i]/100
    } else {
      i = zone.findIndex( el => {
        f = H*el/100
        return e.clientY < f
      })
    }

    this.setState({
      part: item[i],
      layer: -1,
      settings: {
        ...this.state.settings,
        pointer: f - 80 - zone[i]
      }
    })
  }

  onControl = name => {
    if(name === 'view') return
    let mode = this.state.ui.modal_modes.findIndex( entry => {
      return entry === name
    })
    this.setState({
      settings: {
        ...this.state.settings,  modal_mode: mode, modal: true, helper: mode === 3
      }
    })
  }

  onModal = (e, {name}) => {
    console.log('Modal: ',name)
    this.setState({
      settings: {
        ...this.state.settings,  modal_mode: -1, modal: false, helper: false
      }
    })
  }

  onNext = arrow => {
    const { level } = this.state
    let add = (arrow === 'prev') ? -1 : 1
    this.setState({
      count: add,
      index: this.state.index + add
    })
  }

  menuHome = e => {
    console.log('Triggered: menuHome')
    this.setState({
      part: '',
      level: -1,
      index: 0,
      count: 0,
      settings: {
        ...this.state.settings,
        pointer: 250
      }
    })
    //this.props.changeBody({body: ''})
    //this.props.changeLayer({layer: 0})
  }

  onSubmenu = l => {
    this.setState({
      level: l,
      index: 0,
      count: 0,
    })
    //console.log('Submenu active: ',l)
    //this.props.changeLayer({body: this.state.body})
  }

  componentDidMount() {
    const { match,mann } = this.props
    let mannequin = {}
    mann.forEach( entry => {
      const { uid,...man } = entry
      if(uid === Number(match.params.uid)) {
        mannequin.uid = uid
        for( const key in man ) {
          mannequin[key] = []
          const val = man[key].toString(2).split('')
          for(let i=0;i<5;i++){
            if(!val[i]) {
              val.unshift('0')
            }
          }
          mannequin[key] = val
        }
      }
    })
    this.setState({mannequin: mannequin})
  }

  render() {
    const { mannequin,part,count,level,index, settings } = this.state
    const { helper, modal_mode, modal } = settings
    const ui = this.state.ui[this.props.lan]
    const { uid,...mann} = mannequin

    return (
      <div className='App-content'>
        <div className='home-mannequin' onClick={this.onOption}>
          <Mannequin focus={true} base={true} id={uid} />
          {
      Object.keys(mann).map( k => {
        return ( <Mannequin level={level}
          focus={part === k}
          body={k}
          count={count}
          index={index}
          key={k} shelf={mann[k]} id={uid} />
        )
      })
          }
        </div>

        <Controls disable={part === ''} onControl={this.onControl} base={false} pointer={settings.pointer}/>

        <Options
          lng={this.props.lan}
          mann={mann}
          onSubmenu={this.onSubmenu}
          onOption={this.onOption}
          menuHome={this.menuHome}
          position={this.state.part}
        />

        <Arrows
          pointer={settings.pointer}
          hidden={this.state.level < 0}
          lng={this.props.lan}
          onNext={this.onNext}
        />

        <Modal open={modal} centered basic size='tiny'>
          <Modal.Content>
            <p>
              { helper ? <MannHelp lan={this.props.lan} /> : ui[modal_mode] }
            </p>
          </Modal.Content>
          <Modal.Actions>
            { helper ?
              <Button onClick={this.onModal} fluid name='o'>
                <Icon name='checkmark' /> {ui[5]}
              </Button> :
              <Button.Group widths='2'>
                <Button onClick={this.onModal} name='n' secondary basic inverted>
                  <Icon name='remove' /> {ui[4]}
                </Button>
                <Button onClick={this.onModal} name='y' primary>
                  <Icon name='checkmark' /> {ui[3]}
                </Button>
              </Button.Group>
            }
          </Modal.Actions>
        </Modal>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  mann: state.mannequins,
  lan: state.user.language || state.settings.language
})

export default connect(mapStateToProps,{ changeLayer, changeBody, getResource })(MannequinHome)
