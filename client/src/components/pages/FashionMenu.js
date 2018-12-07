import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'semantic-ui-react'

const FashionMenu = (props) => {
  const { match } = props
  console.log('FashionMenu', props)
  const bkg = (props.gen === 'm')? 'man' : 'woman'
  const state = {
          lan: {
            es: ['Mujer', 'Hombre'],
            en: ['Woman', 'Man']
          },
          category: 'HOME'
        }

  return (
    <Menu fluid inverted size='mini'>
      <Menu.Item as='a' href={match.url} active={state.category === 'HOME'} name={bkg}>
        <Icon name={bkg} color='black' size='large'/>
      </Menu.Item>
      <Menu.Item as='a' href={`${match.url}/clothing`} active={state.category === 'CLOTHING'} name='CLOTHING'/>
      <Menu.Item as='a' href={`${match.url}/footwear`} active={state.category === 'FOOTWEAR'} name='FOOTWEAR'/>
      <Menu.Item as='a' href={`${match.url}/accessories`} active={state.category === 'ACCESSORIES'} name='ACCESSORIES'/>
    </Menu>
  )
}

FashionMenu.propTypes = {
  gen: PropTypes.number.isRequired
}

export default FashionMenu
