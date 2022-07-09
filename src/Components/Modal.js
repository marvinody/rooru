import {
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { connect } from "react-redux"
import moment from 'moment'
import "../css/Modal.css"
import OutsideNotifier from "../util/OutsideNotifier"
import UseSwipe from "../util/UseSwipe"
import { hideModal, nextPic, prevPic, loadTagMetadata, changeTags } from "../store"
import { setDoneLoadingPic } from "../store/loadingPic"
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
    idx,
    tag_string,
    tag_string_character: character,
    tag_string_general: generalTags,
    tag_string_meta: metaTags,
    tag_string_copyright: seriesTags,
    tag_string_artist: artist,
    preview_file_url,
    rating,
    created_at,
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
  const title = (artist ? `By "${artist}"` : "Artist Unknown")

  const modalClasses = [
    "modal",
    "show-modal",
  ]

  const imgContainerClasses = [
    "img-resize",
    RATING_TO_CLASS[rating],
  ]

  if(!props.showFullHeight) {
    imgContainerClasses.push('constrain-height')
  }

  const onTagClick = (tagStr) => {
    const tag = {
      value: tagStr,
      positive: true,
    }

    const newTags = [...props.tags, tag]
    props.setTags(newTags)
  }

  const TagList = ({ title, list }) => {
    if (!list || list.length === 0) {
      return null
    }
    return <div className="tag-list">
      <div className="tag-list-title">
        <h2>{title}</h2>
      </div>
      <div className="tag-list-coll">
        {list.split(' ').map(tag => <p key={tag} onClick={e => onTagClick(tag)}>{tag.split('_').join(' ')}</p>)}
      </div>
    </div>
  }

  const AllTags = ({ tags }) => {
    return <div className="tag-list-container">
      {tags.map(t => <TagList {...t} key={t.title} />)}
    </div>
  }

  let titleAffix = `${idx + 1} / ${props.hasMorePics ? "?" : props.numPicsLoaded}`

  UseSwipe({
    left: props.prevPic,
    right: props.nextPic,
  })

  return (
    <div className={modalClasses.join(' ')}>
      <OutsideNotifier onOutsideClick={props.hideModal}>
        <DesktopSideBars />
        <div className="modal-content">
          <div className="controls">
            <div className="title">
              <div className="title-text">
                {`${title} - ${titleAffix}`}
              </div>
              <span>{moment(created_at).format('YYYY-MM-DD')}</span>
              <a href={danbooru_url} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faExternalLinkAlt}></FontAwesomeIcon>
              </a>
            </div>
            <span className="close-button" onClick={props.hideModal}>
              &times;
            </span>
          </div>
          <div className={imgContainerClasses.join(' ')}>
            {props.loading && <Loading
              size={256}
              className='loading-on-top'
              highContrast={true}
            />}
            {props.loading && <img
              className={!props.loading ? 'hidden' : 'preview'} 
              alt={tag_string}
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
                onLoad={props.doneLoading}
              />
            )}
            {!is_image && (
              <video
                className={props.loading ? 'hidden' : ''}
                src={proxied_url}
                autoPlay={props.videoAutoplay}
                muted={props.videoMute}
                controls={props.videoShowControls}
                loop={true}
                onLoadedData={props.doneLoading}
              ></video>
            )}
          </div>
          <AllTags tags={[
            {
              title: 'Character(s)',
              list: (character ? character : "original_character"),
            },
            {
              title: 'Artist(s)',
              list: (artist ? artist : "Artist_Unknown"),
            },
            {
              title: 'General Tags',
              list: generalTags,
            },
            {
              title: 'Series',
              list: seriesTags,
            },
            {
              title: 'Meta Tags',
              list: metaTags,
            },
          ]} />
        </div>
      </OutsideNotifier>
    </div >
  )
}

const mapState = state => ({
  showModal: state.showModal,
  pic: state.selectedPic,
  numPicsLoaded: state.pics.length,
  hasMorePics: state.hasPics,
  loading: state.loadingPic,
  tags: state.tags,
  videoAutoplay: state.settings.videoAutoplay,
  videoMute: state.settings.videoMute,
  videoShowControls: state.settings.videoShowControls,
  showFullHeight: state.settings.showFullHeight,
})

const mapDispatch = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  doneLoading: () => dispatch(setDoneLoadingPic()),
  nextPic: () => dispatch(nextPic()),
  prevPic: () => dispatch(prevPic()),
  setTags: (tags) => {
    // just set the tags (without metadata)
    dispatch(changeTags(tags))
    // this will call setTags for us with needed data
    dispatch(loadTagMetadata())
    dispatch(hideModal())
    dispatch(setDoneLoadingPic())
  },
})

export default connect(mapState, mapDispatch)(Modal)
