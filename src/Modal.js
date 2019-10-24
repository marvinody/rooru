
import React from "react"
import { connect } from 'react-redux'
import './css/Modal.css'
import OutsideNotifier from './OutsideNotifier'
import { hideModal } from "./store"

const notFoundUrl = '/404.png'
export function Modal(props) {
  if (!props.showModal) {
    return null
  }
  // fk u then, I'll make a string that randomly generates so you never get a cache hit

  const { file_url } = props.pic
  const proxied_url = file_url.replace('https://danbooru.donmai.us/data', 'http://booru-proxy.deploy.sadpanda.moe')

  return (
    <OutsideNotifier onOutsideClick={props.hideModal}>
      <div className='modal show-modal' onClick={props.hideModal}>
        <div className="modal-content">
          <span className="close-button" onClick={props.hideModal}>&times;</span>
          <div className='img-resize'>

            <img src={proxied_url} onError={e => {
              e.target.onerror = null
              e.target.src = notFoundUrl
            }} />
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
