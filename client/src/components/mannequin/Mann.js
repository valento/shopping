import React from 'react'

class Mann extends React.Component {
  state = {
    index: 0,
    path: '/img/mannequin/',
    layers: ['top','over','main','under','skin']
  }

  comonentDidUpdate() {
    if(this.props.focus && this.props.count !== 0){
      this.setState({
        index: this.state.index + this.props.count
      })
    }
  }

  render() {
    const {body,focus,k,store} = this.props
    const {index, layers, path} = this.state
    return (
      <div className='body-parts'>
        {layers[k]}
      </div>
    )
  }

}

export default Mann
//<img src={path + this.props.library[body][layers[k]][index]} />{k}
//<img src={path + store[k].items[0]} />
