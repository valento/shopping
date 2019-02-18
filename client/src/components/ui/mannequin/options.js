import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

class Options extends React.Component {
  state = {
    en: {
      body: ['head','corp','waist','legs','feet'],
      layer: ['top','over','main','under','skin']
    },
    es: {
      body: ['cabeza','cuerpo','cintura','piernas','pies'],
      layer: ['tope','over','mitad','debajo','piel']
    },
    _keys: ['head','corp','waist','legs','feet'],
    _layers: ['top','over','main','under','skin']
  }

  onMainClick = (e, {name}) => {
    this.props.onOption(null,name.split('_')[1])
  }

  onSubmenu = (e,{nm}) => {
    //const lev = this.state._layers.findIndex( el => {
    //  return el === name
    //})
    console.log(nm)
    this.props.onSubmenu(nm)
  }

  render() {
    const { body,layer } = this.state[this.props.lng]
    const { mann } = this.props
    let name, ind, position
    let _position = this.state._keys.findIndex( _pos => {
      return _pos === (this.props.position)
    })
    position = (this.props.position === '')? 0 : (_position + 1)
    const trans = {
      left: `-${position*window.screen.width}px`
    }
    const menu = Object.keys(mann).map( k => {
      let i = this.state._keys.findIndex( _k => {
        return _k === k
      })
      return body[i]
    })
    const sub_menus = Object.entries(mann).map( entry => {
      return entry[1]
    })

    return (
      <div className='mnq-menu'>
        <div className='carrousel move' style={trans}>
          <div className='body-part-menu '>
            <Button.Group>
              {menu.map( e => {
                ind = body.findIndex( _k => {
                  return _k === e.toString()
                })
                return (<Button basic color='black'
                    key={'mmenu_'+ind}
                    onClick={this.onMainClick}
                    name={'mmenu_'+ind}
                  >
                    {e}
                  </Button>)
              })}
            </Button.Group>
          </div>
          {sub_menus.map( (sbm,n) => {
            return (
              <div key={(n+10)} className='body-part-menu'>
                <Button.Group key={n}>
                  <Button icon basic onClick={this.props.menuHome}><Icon name='home' size='large' /></Button>
                  {
                    sbm.map( (op,i) => {
                      if(Number(op)>0){
                        return (
                          <Button key={op+'_'+i} onClick={this.onSubmenu} color='grey' nm={i} >
                            {layer[i]}
                          </Button>
                        )
                      }
                    })
                  }
                </Button.Group>
              </div>
            )
          })}
        </div>
      </div>
    )

  }

}

export default Options
