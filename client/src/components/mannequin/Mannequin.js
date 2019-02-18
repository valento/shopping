import React from 'react'
import { connect } from 'react-redux'
import Mann from './Mann'

class Mannequin extends React.Component {
  state = {
    layer: -1,
    body: -1,
    level: ['top','over','main','under','skin'],
    ind: ['head','corp','waist','legs','feet'],
    path: '/img/mannequin/'
  }

  render() {
    let image, z
    const { path, level, ind } = this.state
    const { key, focus, body, id, base, count, index } = this.props
    if( base ) {
      image = path + id + '_base.png'
    } else {
        z = ind.findIndex( i => {
        return i === body
      })
    }

    const lib = this.props.resources[body]

    return (
      <div>
        { base ? (
          <div className='body-parts'>
            <img src={image} />
          </div>
        ) : (
          this.props.shelf.map( (k,i) => {
            //console.log(shelf[k].library[1])
            k = Number(k)
            if(k > 0) {
              const style = {
                zIndex: (9-z)*5+(5-i)
              }
              return (
                <Mann key={i}
                  style={style}
                  layer={level[i]}
                  body={body}
                  count={count}
                  index={index}
                  focus={this.props.focus && i === this.props.level}
                  lib={lib}/>
              )
            }
          })
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  resources: state.resources
})
export default connect(mapStateToProps)(Mannequin)

/*
<Mann key={z+'_'+k}
  style={style}
  layer={level[i]}
  body={this.props.body}
  count={this.props.count}
  focus={i === this.props.level}
  lib={lib}/>
*/
