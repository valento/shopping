import React from 'react'
import { connect } from 'react-redux'
import { changeLayer, changeBody } from '../../actions/mann'

import Mannequin from '../mannequin/Mannequin'
import Controls from '../ui/mannequin/controls'
import Options from '../ui/mannequin/options'

class MannequinHome extends React.Component {
  state = {
  //Active body part:
    part: '',
    level: 0,
    mannequin: {
      uid: 0,
      layer: 0,
      index: 0,
      body: -1
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

    this.props.changeBody({body: item[i]})
    // addItem:
    // editItem:
  }

  menuHome = e => {
    console.log('Triggered: menuHome');
    this.setState({
      part: '',
      settings: {
        ...this.state.settings,
        pointer: 250
      }
    })
    this.props.changeBody({body: ''})
    this.props.changeLayer({layer: 0})
  }

  onSubmenu = l => {
    //console.log('Submenu active: ',l)
    this.setState({level: l})
    console.log(this.state.part)
    this.props.changeLayer({layer: this.state.settings.layer[l]})
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
        mannequin.body = -1
        mannequin.layer = 0
        mannequin.index = 0
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
    const { mannequin, part, level } = this.state
    const { uid,body,layer,index,...mann} = mannequin

    return (
      <div className='App-content'>
        <div className='home-mannequin' onClick={this.onOption}>
          <Mannequin focus={true} human='base' id={uid} />
          {
            Object.keys(mann).map( k => {
              return (
                <div>{k}</div>
              )
          })}
        </div>

        <Controls disable={part === ''} pointer={this.state.settings.pointer}/>

        <Options
          lng={this.props.lan}
          mann={mann}
          onSubmenu={this.onSubmenu}
          onOption={this.onOption}
          menuHome={this.menuHome}
          position={this.state.part}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  mann: state.mannequins,
  lan: state.user.language || state.settings.language
})

export default connect(mapStateToProps,{ changeLayer, changeBody })(MannequinHome)



/*
<div className='home-mannequin' onClick={this.onOption}>
  <Mannequin focus={true} human='base' id={mann.uid} />
  {Object.keys(mann).map( k => {
    if(k !== 'uid') {
      return (<Mannequin key={k}
                focus={body === k ? true : false}
                layer={layer || 0}
                count={rest[k].index}
                human={k}
                store={rest[k]}
              />)
    }
  })}
</div>

<Controls disable={this.state.part === ''} pointer={this.state.settings.pointer}/>

<Options
  lng={this.props.lan}
  mannequin={rest}
  onSubmenu={this.onSubmenu}
  onOption={this.onOption}
  menuHome={this.menuHome}
  position={this.state.part}
/>
*/
