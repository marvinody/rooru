import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { connect } from 'react-redux'
import '../css/AllPics.css'
import { getPics, incPage } from '../store'
import PicCard from './PicCard'

export function AllPics(props) {
  // const { goGetPics } = props
  // useEffect(() => {
  //   goGetPics()
  // }, [goGetPics])

  const loader = <div className="loader">Loading ...</div>

  return (

    <InfiniteScroll
      pageStart={0}
      loadMore={props.getNextPage}
      hasMore={true}
      loader={loader}>

      <div className="pics" key='pics'>
        {props.pics.map(pic => (
          <PicCard {...pic} key={pic.id}></PicCard>
        ))}
      </div>

    </InfiniteScroll>
  )
}

const mapState = state => ({
  pics: state.pics,
})

const mapDispatch = dispatch => ({
  getNextPage: () => {
    dispatch(incPage())
    dispatch(getPics())
  },
})


export default connect(mapState, mapDispatch)(AllPics)
