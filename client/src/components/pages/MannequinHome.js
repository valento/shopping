import React from 'react'
import { connect } from 'react-redux'

import Mannequin from '../mannequin/Mannequin'
import Controls from '../ui/mannequin/controls'
import Options from '../ui/mannequin/options'

class MannequinHome extends React.Component {
  state = {
  //Active body part:
    part: '',
  // What's available for tihs mannequin:
  // ???

  // Dresses On Stage
    dresson: [],

    settings: {
// Mouse Zones in % for:
// 412x736 (iPhone X,8+,7+)
// 360x740 (Samsung)
// 375x667 (iPhone 6,7,8)
// more ??
      zone: [22,43,57,85,100],
  // Controls coordinates:
      pointer: 250,
      item: ['head','corp','waist','legs','feet']
    },
    ui: {
      es: ['Vista tu ', 'Ajustar'],
      en: ['Dress up your ', 'Adjust these']
    }
  }

  onOption = (o) => {
    this.onClick(null, o)
  }

  onClick = ( e, menu_option ) => {
    let f, i
    const { zone, item } = this.state.settings
    const H = window.screen.height

    if(menu_option) {
      i =  menu_option
      f = H*zone[i]/100
    } else {
      i = zone.findIndex( el => {
        f = H*el/100
        return e.clientY < f
      })
    }
console.log('Controls Position: ',menu_option)
    this.setState({
      part: item[i],
      settings: {
        ...this.state.settings,
        pointer: f - 80 - zone[i]
      }
    })
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
  }

  addItem = e => {
    let indx
//    let lngt = this.props.mannequin[item[i]].length
//    if(lngt - 1  > this.state.mannequin[item[i]]) {
//      indx = this.state.mannequin[item[i]] + 1
//    } else {
//      indx = 0
//    }
//    this.setState({
//      mannequin: { ...this.state.mannequin, [item[i]]: indx},
//      part: item[i],
//      pointer: f - 80 - zone[i]
//    })
  }

  render() {
    const { mannequin } = this.props
    return (
      <div className='App-content'>
        <div className='home-mannequin' onClick={this.onClick}>
          <Mannequin active={true} humman='base' id={mannequin.id} />
          {Object.keys(mannequin).map( k => {
            if(k !== 'id') {
              return (<Mannequin key={k}
                        focus={this.state.part === k ? true : false}
                        count={mannequin[k].index}
                        humman={k}
                        library={mannequin[k]}
                      />)
            }
          })}
        </div>
        <Controls disable={this.state.part === ''} pointer={this.state.settings.pointer}/>
        <Options
          lng={this.props.lan}
          mannequin={mannequin}
          onOption={this.onOption}
          menuHome={this.menuHome}
          position={this.state.part}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  mannequin: state.mannequin,
  lan: state.settings.language
})

export default connect(mapStateToProps,null)(MannequinHome)
