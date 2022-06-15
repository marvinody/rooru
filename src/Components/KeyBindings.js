import React from 'react'
import { connect } from 'react-redux'
import useKeypress from '../KeypressHook'
import { hideModal, nextPic, prevPic } from "../store"


const KeyBindings = (props) => {
  // custom keypress hook
  useKeypress(event => {
    switch (event.code) {
      case "Escape":
        if(props.showModal) {
          event.preventDefault()
          return props.showModal && props.hideModal()
        } else {
          return // do nothing if hidden modal
        }
      case "ArrowLeft":
        return props.showModal && props.prevPic()
      case "ArrowRight":
        return props.showModal && props.nextPic()
      default:
        return
    }
  })

  return <React.Fragment />
}


const mapState = state => ({
  showModal: state.showModal,
})

const mapDispatch = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  nextPic: () => dispatch(nextPic()),
  prevPic: () => dispatch(prevPic()),
})

export default connect(mapState, mapDispatch)(KeyBindings)
