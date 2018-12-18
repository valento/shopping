import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class AnyList extends React.Component {

  componentDidUpdate(){
    console.log('AnyList just Updated!')
  }

  render() {
    const {category,taxonomy} = this.props
    let cat = []
    if(taxonomy.length > 0 && category > 0) {
      cat = taxonomy.filter( c => {
        if( c.hasOwnProperty(category) ) return c[category]
      })
    }
    return (
      <Card.Group itemsPerRow='3' className='category'>
        {cat.map( (entry,ind) => <Card key={ind} header={entry[category].name} />)}
      </Card.Group>
    )
  }
}

AnyList.propTypes = {
  taxonomy: PropTypes.array.isRequired,
  category: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  category: state.settings.category,
  taxonomy: state.settings.taxonomy
})

export default connect(mapStateToProps, null)(AnyList)
