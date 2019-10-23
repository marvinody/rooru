import _ from 'lodash'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { connect } from 'react-redux'
import '../css/AllPics.css'
import { getPics, showModal } from '../store'
import { selectPic } from '../store/selectedPic'
import PicCard from './PicCard'
export function AllPics(props) {
  // const { getNextPage } = props
  // useEffect(() => {
  //   getNextPage()
  // }, [getNextPage])

  const loader = <div className="loader" key='loader'>Loading ...</div>

  return (

    <InfiniteScroll
      pageStart={0}
      loadMore={props.getNextPage}
      hasMore={props.page < 10}
      loader={loader}
      initialLoad={true}
    >


      <div className="pics" key='pics'>
        {props.pics.map(pic => (
          <PicCard {...pic} key={pic.id} showModal={props.showModal} setPicToCard={() => props.selectPic(pic)}></PicCard>
        ))}
      </div>

    </InfiniteScroll>

  )
}

const mapState = state => ({
  pics: state.pics,
  page: state.page,
  loadingPics: state.loadingPics,
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
  }, 250, {
    leading: true,
  }),
  showModal: () => dispatch(showModal()),
  selectPic: (pic) => dispatch(selectPic(pic)),
})


export default connect(mapState, mapDispatch)(AllPics)
