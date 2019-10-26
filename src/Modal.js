
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './css/Modal.css'
import OutsideNotifier from './OutsideNotifier'
import { hideModal } from "./store"
const notFoundUrl = '/404.png'
export function Modal(props) {
  if (!props.showModal) {
    return null
  }

  const {
    file_url,
    id,
    tag_string_character: character,
    tag_string_artist: artist,
  } = props.pic

  const proxied_url = file_url.replace('https://danbooru.donmai.us/data', 'http://booru-proxy.deploy.sadpanda.moe')
  const danbooru_url = `https://danbooru.donmai.us/posts/${id}`
  const title = (character ? character : 'original character')
    + (artist ? (' by ' + artist) : '')


  return (
    <OutsideNotifier onOutsideClick={props.hideModal}>
      <div className='modal show-modal' onClick={props.hideModal}>
        <div className="modal-content">

          <div className='controls'>
            <div className='title'>
              <Link className='title-text' to={`/${id}`}>
                <span className='title'>{title}</span>
              </Link>
              <a href={danbooru_url} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faExternalLinkAlt}></FontAwesomeIcon>
              </a>
            </div>
            <span className="close-button" onClick={props.hideModal}>&times;</span>
          </div>
          <div className='img-resize'>

            <img src={proxied_url} onError={e => {
              e.target.onerror = null
              e.target.src = notFoundUrl
            }} />
          </div>
        </div>
      </div>
    </OutsideNotifier >

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
