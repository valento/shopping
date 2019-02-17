import React from 'react'
import Mann from './Mann'

class Mannequin extends React.Component {
  state = {
    level: ['skin','under','main','over','top'],
    index: ['head','legs','waist','corp','feet'],
    path: '/img/mannequin/'
  }

  render() {
    let image, z
    const { path, level, index } = this.state
    const { store, key, focus, id, base } = this.props
    if( base ) {
      image = path + id + '_base.png'
    } else {
        z = index.findIndex( i => {
        return i === key
      })
    }

    return (
      <div>
        { base ? (
          <div className='body-parts'>
            <img src={image} />
          </div>
        ) : (
          Object.keys(store).map( k => {
            //console.log(store[k].library[1])
            if(store[k]>0) {

              const style = {
                zIndex: z*10+k
              }
              return (
                <Mann key={z+'_'+k}
                  style={style}
                  k={k}
                  body={this.props.body}
                  count={this.props.count}
                  focus={k === this.props.level}
                  lib={0}/>
              )
            }
          })
        )}
      </div>
    )
  }
}

export default Mannequin
