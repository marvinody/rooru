
import '../css/Settings.css'
import React, { } from 'react'
import Switch from 'react-ios-switch'
import { connect } from 'react-redux'

import { resetPage, toggleSetting } from '../store'

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
      text: 'Mute Videos',
    },
    {
      key: 'videoShowControls',
      text: 'Show Video Controls',
    },
    {
      key: 'showFullHeight',
      text: 'Show Full Height Images',
    },
    {
      key: 'exactTextMatch',
      text: 'Use Exact Text Match (Tag Search)',
    },
    {
      key: 'cardShowTriangle',
      text: 'Show Triangle on Thumbnails',
    },
    {
      key: 'listShowDeleted',
      text: 'Show Deleted Images (top left black triangle)',
      shouldResetPage: true,
    },
  ]
  return (
    <div className={classes.join(' ')}>
      {booleanSettings.map(({ key, text, shouldResetPage }) =>
        <SingleSetting
          key={key}
          text={text}
          checked={props.allSettings[key]}
          onChange={() => {
            props.toggleSetting(key)
            if(shouldResetPage) {
              props.resetPage()
            }
          }}
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
  resetPage: () => dispatch(resetPage()),
})


export default connect(mapState, mapDispatch)(Settings)

