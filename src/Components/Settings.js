
import '../css/Settings.css'
import React, { } from 'react'
import Switch from 'react-ios-switch'
import { connect } from 'react-redux'

import { toggleSetting } from '../store'

const Settings = function Settings(props) {
  const classes = [
    'settings-menu',
  ]
  if (!props.showSettings) {
    classes.push('hide')
  }

  const booleanSettings = [
    {
      key: 'videoAutoplay',
      text: 'Autoplay Video',
    },
    {
      key: 'videoMute',
      text: 'Muted Videos',
    },
    {
      key: 'videoShowControls',
      text: 'Show Video Controls',
    },
  ]
  return (
    <div className={classes.join(' ')}>
      {booleanSettings.map(({ key, text }) =>
        <SingleSetting
          key={key}
          text={text}
          checked={props.allSettings[key]}
          onChange={() => props.toggleSetting(key)}
        />
      )}

    </div>
  )
}

const SingleSetting = ({ checked, onChange, text }) => {
  return <div className='settings-single'>
    <span className='text'>{text}</span>
    <Switch
      checked={checked}
      onChange={onChange}
    />
  </div>
}


const mapState = state => ({
  showSettings: state.settings.show,
  allSettings: state.settings,
})

const mapDispatch = dispatch => ({
  toggleSetting: key => dispatch(toggleSetting(key)),
})


export default connect(mapState, mapDispatch)(Settings)

