import _ from 'lodash'
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { connect } from 'react-redux'
import '../css/AllPics.css'
import { getPics, showModal, loadTagMetadata } from '../store'
import { selectPic } from '../store/selectedPic'
import Loading from './Loading'
import PicCard from './PicCard'

export function AllPics(props) {
  const { getNextPage, loadTagMetadata } = props
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
  return (
    <div className={classes.join(' ')}>
      <InfiniteScroll
        pageStart={0}
        loadMore={props.getNextPage}
        hasMore={props.hasMore}
        loader={<Loading key='loading'></Loading>}
        initialLoad={true}
      >


        <div className="pics" key='pics'>
          {props.pics.map((pic, idx) => (
            <PicCard {...pic} key={pic.id} showModal={props.showModal} setPicToCard={() => props.selectPic(pic, idx)}></PicCard>
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
