import React from 'react'

export default class Mannequin extends React.Component {
  state = {
    level: ['skin','under','main','over','top'],
    index: ['head','legs','waist','corp','feet'],
    path: '/img/mannequin/'
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
//<div className='body-parts'><img src={path + k.library[count]} /></div>
console.log(store)
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
            return (<div className='body-parts' style={style}><img src={path + store[k].library[1]} /></div>)
          })
        )}
      </div>
    )
  }
}
