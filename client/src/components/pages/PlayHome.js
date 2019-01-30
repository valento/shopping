import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Button, Card, Icon } from 'semantic-ui-react'

export default class PlayHome extends React.Component {
  render() {
    return (
      <div className='App-content'>
        <div className='home-page vintage padded labeled'>
          <p className='paraf-big'>Mannequins</p>
          <Divider horizontal className='promo'> * * * </Divider>
          <Card.Group itemsPerRow={2}>
            <Card raised className='main' as={Link} to='/mannequin/2/1'>
              <Card.Content>
                <Card.Header>Mannequin.1</Card.Header>
                <Card.Header><Icon name='image' size='huge' /></Card.Header>
              </Card.Content>
            </Card>
            <Card raised>
              <Card.Content>
                <Card.Header>2</Card.Header>
                <Card.Header><Icon name='image' size='huge' /></Card.Header>
              </Card.Content>
            </Card>
            <Card raised>
              <Card.Content>
                <Card.Header>3</Card.Header>
                <Card.Header><Icon name='image' size='huge' /></Card.Header>
              </Card.Content>
            </Card>
            <Card raised>
              <Card.Content>
                <Card.Header>4</Card.Header>
                <Card.Header><Icon name='image' size='huge' /></Card.Header>
              </Card.Content>
            </Card>
            <Card raised>
              <Card.Content>
                <Card.Header>5</Card.Header>
                <Card.Header><Icon name='image' size='huge' /></Card.Header>
              </Card.Content>
            </Card>
          </Card.Group>
        </div>
      </div>
    )
  }
}
