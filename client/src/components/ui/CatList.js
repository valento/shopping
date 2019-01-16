import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const CatList = ({onSub,category,domain,cat}) => {
  return (
    <Card.Group itemsPerRow='3' className='category'>
      {cat.map( (entry) => <Card
          key={entry[category].cat_id}
          onClick={(e, {key}) => onSub(entry[category].cat_id)}
        >
        <Card.Content>
          <Card.Header>
            <Icon name={(domain > 1)? 'female' : 'male'} size='big' /><br/>
            {entry[category].name}
          </Card.Header>
        </Card.Content>
      </Card>)}
    </Card.Group>
  )
}

export default CatList
