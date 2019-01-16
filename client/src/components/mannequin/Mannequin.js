import React from 'react'

export default class Mannequin extends React.Component {
  render() {
    const image = '/img/'+this.props.humman+'00'+this.props.count+'.png'
    return (
      <div className={'body ' + this.props.humman}>
        {this.props.active? (<img src={image} />) : null}
      </div>
    )
  }
}
