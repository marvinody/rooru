
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../css/Modal.css'
import OutsideNotifier from '../OutsideNotifier'
import { hideModal } from "../store"
import { setDoneLoading } from '../store/loadingPic'
import Loading from './Loading'
import NavSideBars from './NavSideBars'
const notFoundUrl = '/404.jpg'
export function Modal(props) {
  if (!props.showModal) {
    return null
  }
  const {
    file_url,
    has_large,
    large_file_url,
    file_ext,
    id,
    tag_string,
    tag_string_character: character,
    tag_string_artist: artist,
  } = props.pic

  const is_image = /jpe?g|png|gif/.test(file_ext)

  let proxied_url = file_url.replace('https://danbooru.donmai.us/data', 'https://booru-proxy.deploy.sadpanda.moe')
  // is probably a video file
  if (file_ext === 'zip' && has_large) {
    proxied_url = large_file_url.replace('https://danbooru.donmai.us/data', 'https://booru-proxy.deploy.sadpanda.moe')
  }
  const danbooru_url = `https://danbooru.donmai.us/posts/${id}`
  const title = (character ? character : 'original character')
    + (artist ? (' by ' + artist) : '')

  return (
    <OutsideNotifier onOutsideClick={props.hideModal}>
      <NavSideBars />
      <div className='modal show-modal' onClick={props.hideModal}>
        <div className="modal-content">

          <div className='controls'>
            <div className='title'>
              <Link className='title-text' to={`/${id}`}>
                {title}
              </Link>
              <a href={danbooru_url} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faExternalLinkAlt}></FontAwesomeIcon>
              </a>
            </div>
            <span className="close-button" onClick={props.hideModal}>&times;</span>
          </div>
          <div className='img-resize'>
            {props.loading && <Loading></Loading>}
            {is_image && <img src={proxied_url}
              alt={tag_string}
              onError={e => {
                e.target.onerror = null
                e.target.src = notFoundUrl
                props.doneLoading()
              }}
              // this may or may not work for everything
              // definitely need to revisit this
              onLoadCapture={e => props.doneLoading()}

            />}
            {!is_image && <video
              src={proxied_url}
              autoPlay={true}
              loop={true}
              onLoadedData={e => {
                console.log('VIDEO DONE')
                props.doneLoading()
              }}
            ></video>}
          </div>
        </div>
      </div>
    </OutsideNotifier >

  )
}

const mapState = state => ({
  showModal: state.showModal,
  pic: state.selectedPic,
  loading: state.loadingPic,
})

const mapDispatch = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  doneLoading: () => dispatch(setDoneLoading()),
})


export default connect(mapState, mapDispatch)(Modal)
