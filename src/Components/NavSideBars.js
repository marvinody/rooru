import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react"
import { connect } from 'react-redux'
import '../css/NavSideBars.css'
import { nextPic, prevPic } from "../store"
const NavSideBars = (props) => {
  if (!props.visible) {
    return null
  }
  return (
    <div className='sidebars' >
      <div class='left desktop sidebar' onClick={props.prevPic}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>

      <div className='right desktop sidebar' onClick={props.nextPic}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  )
}

const mapState = state => ({
  visible: state.showModal,
})

const mapDispatch = dispatch => ({
  nextPic: () => dispatch(nextPic()),
  prevPic: () => dispatch(prevPic()),
})


export default connect(mapState, mapDispatch)(NavSideBars)
