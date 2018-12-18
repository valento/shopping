import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'
import { changeCategory } from '../../actions/'

class FashionMenu extends React.Component {

  handleClick(e, { index }) {
    this.props.changeCategory(index)
  }

  render() {
    const { match, category } = this.props
    let cat = []
    const bkg =  (this.props.gen > 1) ? 'woman' : 'man'
    //const {taxonomy} = this.props
    if(this.props.taxonomy !== undefined) {
      if(this.props.taxonomy.length > 0){
        cat = this.props.taxonomy.filter( c => {
          if( c.hasOwnProperty('0')) return c[0]
        })
      }
      console.log(cat)
    }

    return (
      <Menu fluid inverted size='mini'>
        <Menu.Item as={Link} to={match.url}
          active={category === '0'}
          onClick={(e, {index}) => this.props.changeCategory(index)}
          index={0}
        >
          <Icon name={bkg} color='black' size='large'/>
        </Menu.Item>
        {(cat.length > 0)?
          cat.map( entry => {
            return (
              <Menu.Item as={Link} to={`${match.url}/${entry[0].cat_id}`}
                active={category === entry[0].cat_id}
                onClick={(e, {index}) => this.props.changeCategory(index)}
                index={entry[0].cat_id}
                name={entry[0].name.toUpperCase()}
              />
            )
          })
          :
          ''
        }
      </Menu>
    )
  }
}

FashionMenu.propTypes = {
  lan: PropTypes.number.isRequired,
  gen: PropTypes.number.isRequired,
  category: PropTypes.number.isRequired,
  taxonomy: PropTypes.array
}

const mapStateToProps = state => ({
  category: state.settings.category,
  lan: state.settings.language,
  taxonomy: state.settings.taxonomy
})

export default connect(mapStateToProps,{ changeCategory })(FashionMenu)


/*

<Menu.Item as={Link} to={`${match.url}/footwear`}
  active={category === '2'}
  onClick={(e, {index}) => this.props.changeCategory(index)}
  index={2}
  name='FOOTWEAR'
/>
<Menu.Item as={Link} to={`${match.url}/accessories`}
  active={category === '3'}
  onClick={(e, {index}) => this.props.changeCategory(index)}
  index={3}
  name='ACCESSORIES'
/>
*/
