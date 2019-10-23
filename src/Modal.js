
import React from "react"
import { connect } from 'react-redux'
import './css/Modal.css'
import OutsideNotifier from './OutsideNotifier'
import { hideModal } from "./store"

export function Modal(props) {
  if (!props.showModal) {
    return null
  }
  return (
    <OutsideNotifier onOutsideClick={props.hideModal}>
      <div className='modal show-modal' onClick={props.hideModal}>
        <div className="modal-content">
          <span className="close-button" onClick={props.hideModal}>&times;</span>
          <div className='img-resize'>

            <img src={props.pic.file_url} />
          </div>
        </div>
      </div>
    </OutsideNotifier>



  )
}

const mapState = state => ({
  showModal: state.showModal,
  pic: state.selectedPic,
})

const mapDispatch = dispatch => ({
  hideModal: () => dispatch(hideModal()),
})


export default connect(mapState, mapDispatch)(Modal)
