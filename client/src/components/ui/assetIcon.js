import React from 'react'
import { Icon, Label, Button } from 'semantic-ui-react'
const AssetIcon = props => {
  return (
    <div className={'main-icon' + (props.main ? ' asset-icon' : ' iconic')}>
      <Label pointing='below' color='black' basic size='large'>{props.name}</Label>
      <div className={(props.main ? ' dot' : '')}>
        {props.value}
      </div>
    </div>
  )
}

export default AssetIcon
