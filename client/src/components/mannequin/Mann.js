import React from 'react'

class Mann extends React.Component {
  state = {
    index: 0,
    path: '/img/mannequin/',
    layers: ['top','over','main','under','skin'],
    lib: ['']
  }

  componentDidUpdate(prevProps) {
    const {focus,index,count,lib,layer} = this.props
    const librar = ['']
    let library = librar.concat(lib[layer])
    if(focus && index !== prevProps.index){
      if(this.state.index + count < 0) {
        this.setState({
          index: library.length - 1
        })
      } else if(this.state.index + count > library.length - 1) {
        this.setState({
          index: 0
        })
      } else {
        this.setState({
          index: this.state.index + count
        })
      }

    }
    console.log('Mann updated: ',count)
  }

  render() {
    let lbr = [''], library = []
    const {focus,count,style,layer,lib,body} = this.props
    const {index,layers,path} = this.state
    if(lib !== undefined && layer !== undefined ) {
      library = lbr.concat(lib[layer])
      console.log(body, library)
    }

//if(this.props.lib.length > 0) console.log(this.props.lib[layer])
    return (
      <div className='body-parts' style={style}>
        <img src={path+library[index]+'.png'} />
      </div>
    )
  }

}

export default Mann
//<img src={path + this.props.library[body][layers[k]][index]} />{k}
//<img src={path + store[k].items[0]} />
