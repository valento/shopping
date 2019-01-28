import React from 'react'

export default class Mannequin extends React.Component {
  render() {
    let image
    const { humman,items,count,active,id } = this.props
    if(humman === 'base') {
      image = '/img/mannequin/' + id + '_base.png'
    } else {
      image = (count > 0)? '/img/mannequin/' + items[count] : null
    }

    return (
      <div className='body-parts'>
        { (active)? (<img src={image} />) : null }
      </div>
    )
  }
}
