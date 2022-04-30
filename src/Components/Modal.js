import {
  faChevronLeft,
  faChevronRight,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import "../css/Modal.css"
import OutsideNotifier from "../OutsideNotifier"
import { hideModal, nextPic, prevPic } from "../store"
import { setDoneLoading } from "../store/loadingPic"
import Loading from "./Loading"
import DesktopSideBars from "./NavSideBars"
const notFoundUrl = "/404.jpg"

const RATING_TO_CLASS = {
  's': 'rating-safe',
  'q': 'rating-questionable',
  'e': 'rating-explicit',
}

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
    idx,
    preview_file_url,
    image_height,
    image_width,
    rating,
  } = props.pic

  const is_image = /jpe?g|png|gif/.test(file_ext)

  let proxied_url = file_url.replace(
    "https://danbooru.donmai.us/data",
    "https://booru-proxy.deploy.sadpanda.moe"
  )
  // is probably a video file
  if (file_ext === "zip" && has_large) {
    proxied_url = large_file_url.replace(
      "https://danbooru.donmai.us/data",
      "https://booru-proxy.deploy.sadpanda.moe"
    )
  }
  const danbooru_url = `https://danbooru.donmai.us/posts/${id}`
  const title =
    `${idx + 1}: ` +
    (character ? character : "original character") +
    (artist ? " by " + artist : "")

    const modalClasses = [
      "modal",
      "show-modal",
    ]

    const imgContainerClasses = [
      "img-resize",
      RATING_TO_CLASS[rating],
    ]

  return (
    <div className={modalClasses.join(' ')}>
      <OutsideNotifier onOutsideClick={props.hideModal}>
        <DesktopSideBars />
        <div className="modal-content">
          <div className="controls">
            <div className="title">
              <Link className="title-text" to={`/${id}`}>
                {title}
              </Link>
              <a href={danbooru_url} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faExternalLinkAlt}></FontAwesomeIcon>
              </a>
            </div>
            <span className="close-button" onClick={props.hideModal}>
              &times;
            </span>
          </div>
          <div className={imgContainerClasses.join(' ')}>
            <div class="left sidebar mobile" onClick={props.prevPic}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>

            {props.loading && <Loading
              size={256}
              className='loading-on-top'
              highContrast={true}
            />}
            {props.loading && <img
              className={!props.loading ? 'hidden' : 'preview'} width={image_width}
              alt={tag_string}
              height={image_height}
              src={preview_file_url}
            />}

            {is_image && (
              <img
                className={props.loading ? 'hidden' : ''}
                src={proxied_url}
                title={tag_string}
                alt={tag_string}
                onError={e => {
                  e.target.onerror = null
                  e.target.src = notFoundUrl
                  props.doneLoading()
                }}
                // this may or may not work for everything
                // definitely need to revisit this
                onLoad={e => props.doneLoading()}
              />
            )}
            {!is_image && (
              <video
                className={props.loading ? 'hidden' : ''}
                src={proxied_url}
                autoPlay={true}
                loop={true}
                onLoadedData={e => {
                  props.doneLoading()
                }}
              ></video>
            )}
            <div className="right sidebar mobile" onClick={props.nextPic}>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
          <div className="tag-list">
            {props.pic.tag_string_general.split(' ').map(tag => <p key={tag}>{tag.split('_').join(' ')}</p>)}
          </div>
        </div>
      </OutsideNotifier>
    </div >
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
  nextPic: () => dispatch(nextPic()),
  prevPic: () => dispatch(prevPic()),
})

export default connect(mapState, mapDispatch)(Modal)
