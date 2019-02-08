import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

class Options extends React.Component {
  state = {
    en: {
      body: ['head','corp','waist','legs','feet']
    },
    es: {
      body: ['cabeza','cuerpo','cintura','piernas','pies']
    },
    _keys: ['head','corp','waist','legs','feet'],
    _layers: ['top','over','main','under','skin']
  }

  onMainClick = (e, {name}) => {
    this.props.onOption(name.split('_')[1])
  }

  onSubmenu = (e, {name}) => {
    console.log(name)
  }

  render() {
    const { body } = this.state[this.props.lng]
    const { mannequin } = this.props
    const { id, ...man } = mannequin
    let name, ind, position

    let _position = this.state._keys.findIndex( _pos => {
      return _pos === (this.props.position)
    })
    position = (this.props.position === '')? 0 : (_position + 1)

    const trans = {
      left: `-${position*window.screen.width}px`
    }

    const menu = Object.keys(man).map( k => {
      let i = this.state._keys.findIndex( _k => {
        return _k === k
      })
      return body[i]
    })
    const sub_menus = Object.entries(man).map( entry => {
      return Object.keys(entry[1])
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

          {sub_menus.map( (en,indx) => {
              return (
                <div key={indx} className='body-part-menu'>
                  <Button.Group >
                    <Button icon basic onClick={this.props.menuHome}><Icon name='home' size='large' /></Button>
                    {en.map( ( e, indx ) => {
                      return (<Button key={e+'_'+indx.toString()}
                        onClick={this.onSubmenu}
                        color='grey'
                        name={e}
                      >
                        {e}
                      </Button>)
                    })}
                  </Button.Group>
                </div>
              )
            })
          }
        </div>
      </div>
    )

  }

}

export default Options
