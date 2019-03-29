import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { TransitionablePortal, Segment } from 'semantic-ui-react'

import GalleryList from '../ui/GalleryList'
import { getListGallery,gallerySocAction,getSocialData } from '../../actions/gallery'
import BigImage from '../ui/bigimage'

class GalleryHome extends React.Component {
  state = {
    filter: '',
    indx: 0,
    image_big: false
  }
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

  onThumb = (id,ind) => {
    let data = {}
    console.log('Open image: ',id,ind)
    this.setState({
      indx: ind,
      image_big: true
    })
    data.viewed = 1
    data.resource_id = id
    this.props.getSocialData(id)
    this.props.gallerySocAction({data})
  }

  onFilter = filter => {
    this.setState({
      filter: filter
    })
  }
  onMenu = () => {
    this.setState({
      image_big: false
    })
  }
  onBigSubmenu = data => {
    console.log('Gallery Submenu: ',data)
    this.props.gallerySocAction(data)
  }

  render() {
    const deadline = new Date('2019-04-10T00:24:00')
    const now = new Date()
    const rm = new Date(deadline-now)
    const {gallery,mem} = this.props

    return (
      <div className='gallery'>
          {(gallery.length > 0) &&
            <GalleryList onFilter={this.onFilter} onThumb={this.onThumb}
              gallery={gallery} membership={mem}
            />
          }
        <div className='clear'></div>
        <div>
          <p><br/><br/><br/><p>* * * * *</p></p>
          <p>Come back for more in: </p>
          <span className='digital'>{rm.getDate()} days : {rm.getHours()} hours : {rm.getMinutes()} minutes</span>
        </div>
        <TransitionablePortal
          open={this.state.image_big}
          closeOnDocumentClick={false}
          transition={{animation:'fly left', duration: 800}}
        >
          <div style={{width: '100vw', position: 'absolute', top: '9vh', left: 0 }}>
            {(gallery.length>0) &&
              <BigImage onSubmenu={this.onBigSubmenu} onMenu={this.onMenu}
                indx={this.state.indx} gallery={gallery}
              />
            }
          </div>
        </TransitionablePortal>
      </div>
    )
  }
}

GalleryHome.propTypes = {
  gallery: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  gallery: state.gallery,
  mem: state.user.membership
})

export default connect(mapStateToProps, { getListGallery,gallerySocAction,getSocialData } )(GalleryHome)
