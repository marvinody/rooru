
import '../css/Settings.css'
import React, { } from 'react'
import { connect } from 'react-redux'

import { toggleAboutPage } from '../store'

const Settings = function Settings(props) {
  const classes = [
    'about-menu',
  ]
  if (!props.showAbout) {
    classes.push('hide')
  }


  return (
    <div className={classes.join(' ')}>
      <h2>Rooru</h2>
      <div className='desc'>
        <p>Danbooru but Infinite Scroll</p>

        <p>
          Features:
        </p>
        <ul>
          <li>Infinite scroll</li>
          <li>Click image to enlarge image</li>
          <li>Videos will autoplay by default (change in settings [the gear])</li>
          <li>Multi-tag searching</li>
            <ul>
              <li>Click added tags to remove them from search</li>
              <li>Click the plus/minus to include or exclude the tag</li>
              <li>You can also click on an image's tags to include it to the search</li>
            </ul>
            <li>Your rating filters are saved for next time you visit</li>
        </ul>
      </div>
    </div>
  )
}

const mapState = state => ({
  showAbout: state.about.show,
})

const mapDispatch = dispatch => ({
  toggleSetting: () => dispatch(toggleAboutPage()),
})


export default connect(mapState, mapDispatch)(Settings)

