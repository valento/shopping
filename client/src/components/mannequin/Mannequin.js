import React from 'react'
import Mann from './Mann'

class Mannequin extends React.Component {
  constructor(props) {
    super()
    this.state = {
      level: ['skin','under','main','over','top'],
      index: ['head','legs','waist','corp','feet'],
      path: '/img/mannequin/'
    }
  }
  render() {
    let image, z
    const { path, level, index } = this.state
    const { human,count,store,focus,id } = this.props
    if( human === 'base' ) {
      image = path + id + '_base.png'
    } else {
        z = index.findIndex( i => {
        return i === human
      })
    }

    return (
      <div>
        {(human === 'base')? (
          <div className='body-parts'>
            <img src={image} />
          </div>
        ) : (
          Object.keys(store).map( k => {
            //console.log(store[k].library[1])
            const ind = level.findIndex(el => {
              return el === k
            })
            const style = {
              zIndex: z*10+ind
            }
            return (
              <Mann key={human+'_'+k} style={style} store={store} k={k} focus={ind === this.props.level} lib={0}/>
            )
          })
        )}
      </div>
    )
  }
}

export default Mannequin
