import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import GalleryList from '../ui/GalleryList'
import { getListGallery } from '../../actions/gallery'

class GalleryHome extends React.Component {
  componentDidMount(){
    this.props.getListGallery()
  }

  componentDidUpdate(prevProps){
    if (this.props.gallery.length !== prevProps.gallery.length) {
      this.setState({
        gallery: this.props.gallery
      })
  }
  }

  render() {
    const deadline = new Date('2019-04-10T00:24:00')
    const now = new Date()
    const rm = new Date(deadline-now)

    console.log('Gallery Component: ', this.props.gallery)
    return (
      <div className='gallery'>
          {(this.props.gallery.length > 0) && <GalleryList gallery={this.props.gallery} />}
        <div className='general'>
          <h2>Gallery is Empty for now!</h2>
          <p>Come back in: </p>
          <span className='digital'>{rm.getDate()} days : {rm.getHours()} hours : {rm.getMinutes()} minutes</span>
        </div>
      </div>
    )
  }
}

GalleryHome.propTypes = {
  gallery: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  gallery: state.gallery
})

export default connect(mapStateToProps, { getListGallery } )(GalleryHome)
