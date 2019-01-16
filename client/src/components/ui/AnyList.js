import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CatList from './CatList'
import { changeCategory } from '../../actions'

class AnyList extends React.Component {

  componentDidUpdate(){
    console.log('AnyList just Updated!')
  }

  onSubcat = (c) => {
    console.log('Sub Category: ', c)
    this.props.changeCategory(c)
  }

  render() {
    const {category,taxonomy,domain} = this.props
    let cat = []
    if(taxonomy.length > 0 && category > 0) {
      cat = taxonomy.filter( c => {
        if( c.hasOwnProperty(category) ) return c[category]
      })
    }
    return (
      <CatList cat={cat} category={category} domain={domain} onSub={this.onSubcat}/>
    )
  }
}

AnyList.propTypes = {
  taxonomy: PropTypes.array.isRequired,
  category: PropTypes.number.isRequired,
  domain: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  category: state.settings.category,
  taxonomy: state.settings.taxonomy,
  domain: state.settings.domain
})

export default connect(mapStateToProps, { changeCategory })(AnyList)
