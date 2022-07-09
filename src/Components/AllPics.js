import _ from 'lodash'
import React, { useEffect, useRef, createRef } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { connect } from 'react-redux'
import '../css/AllPics.css'
import { getPics, showModal, loadTagMetadata } from '../store'
import { selectPic } from '../store/selectedPic'
import Loading from './Loading'
import PicCard from './PicCard'

export function AllPics(props) {
  const { getNextPage, loadTagMetadata, selectedPicIdx } = props
  useEffect(() => {
    getNextPage()
  }, [getNextPage])
  useEffect(() => {
    loadTagMetadata()
  }, [loadTagMetadata])
  const classes = [
    'scroller',
  ]
  if (props.showSettings || props.showAbout) {
    classes.push('hide')
  }

  // logic for scrolling down when user hits next gets a little unwieldly here
  const cardRefs = useRef([])
  // these get attached in the loop below
  cardRefs.current = props.pics.map((_, idx) => cardRefs.current[idx] ?? createRef())
  // and we only care to trigger it when the idx Prop gets changed
  useEffect(() => {
    cardRefs.current?.[selectedPicIdx]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    })
  }, [selectedPicIdx])

  const showTriangle = props.cardShowTriangle && props.totalFilters !== 1

  return (
    <div className={classes.join(' ')}>
      <InfiniteScroll
        pageStart={0}
        loadMore={props.getNextPage}
        hasMore={props.hasMore}
        loader={<Loading key='loading' className=''></Loading>}
        initialLoad={true}
      >


        <div className="pics" key='pics'>
          {props.pics.map((pic, idx) => (
            <PicCard
              {...pic}
              key={pic.id}
              showModal={props.showModal}
              setPicToCard={() => props.selectPic(pic, idx)}
              wasLastSelected={idx === selectedPicIdx}
              showTriangle={showTriangle}
              ref={cardRefs.current[idx]}
            />
          ))}
        </div>

      </InfiniteScroll>
    </div>

  )
}

const mapState = state => ({
  pics: state.pics,
  page: state.page,
  loadingPics: state.loadingPics,
  hasMore: state.hasPics,
  showSettings: state.settings.show,
  showAbout: state.about.show,
  cardShowTriangle: state.settings.cardShowTriangle,
  totalFilters: state.ratingFilters.general + state.ratingFilters.sensitive + state.ratingFilters.questionable + state.ratingFilters.explicit,
  selectedPicIdx: state.selectedPic.idx,
})

const mapDispatch = dispatch => ({
  // getNextPage: isLoading => page => {
  //   console.log({ isLoading, page })
  //   if (isLoading) {
  //     return false
  //   }
  //   dispatch(incPage())
  //   dispatch(getPics())
  // },
  getNextPage: _.debounce((page) => {
    dispatch(getPics())
  }, 150, {
    leading: false,
    trailing: true,
  }),
  showModal: () => dispatch(showModal()),
  selectPic: (pic, idx) => dispatch(selectPic(pic, idx)),
  loadTagMetadata: () => dispatch(loadTagMetadata()),
})


export default connect(mapState, mapDispatch)(AllPics)
