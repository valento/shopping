import React from 'react'
import { connect } from 'react-redux'
import { changeLayer, changeBody, getResource } from '../../actions/mann'

import Mannequin from '../mannequin/Mannequin'
import Controls from '../ui/mannequin/controls'
import Options from '../ui/mannequin/options'
import Arrows from '../ui/mannequin/arrows'

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
      item: ['head','corp','waist','legs','feet'],
      layer: ['top','over','main','under','skin']
    },
    ui: {
      es: ['Vista tu ', 'Ajustar'],
      en: ['Dress up your ', 'Adjust these']
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
      settings: {
        ...this.state.settings,
        pointer: f - 80 - zone[i]
      }
    })

    //this.props.changeBody(body: {
    //  [item[i]]: {}
    //})
    // addItem:
    // editItem:
  }

  onNext = arrow => {
    const { level } = this.state
    let add = (arrow === 'prev') ? -1 : 1
    this.setState({
      count: add,
      index: this.state.index + add
    })
    //let count = (this.state.body[this.state.part][this.state.settings.layer[level]]+1)
    //this.setState({
    //  ...this.state, body: {
    //    ...this.state.body,
    //    [this.state.part]:
    //    {[this.state.settings.layer[level]]: count}
    //  }
    //})
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

  addItem = e => {
    let indx
  }

  activeMann = e => {

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
    const { mannequin,part,count,level,index } = this.state
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

        <Controls disable={part === ''} base={false} pointer={this.state.settings.pointer}/>

        <Options
          lng={this.props.lan}
          mann={mann}
          onSubmenu={this.onSubmenu}
          onOption={this.onOption}
          menuHome={this.menuHome}
          position={this.state.part}
        />

        <Arrows
          hidden={this.state.level < 0}
          lng={this.props.lan}
          onNext={this.onNext}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  mann: state.mannequins,
  lan: state.user.language || state.settings.language
})

export default connect(mapStateToProps,{ changeLayer, changeBody, getResource })(MannequinHome)
