import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import '../css/AllPics.css'
import { getPics } from '../store'
import PicCard from './PicCard'

export function AllPics(props) {
  const { goGetPics } = props
  useEffect(() => {
    goGetPics()
  }, [goGetPics])

  return (
    <div className="pics">
      {props.pics.map(pic => (
        <PicCard {...pic} key={pic.id}></PicCard>
      ))}
    </div>
  )
}

const mapState = state => ({
  pics: state.pics,
})

const mapDispatch = dispatch => ({
  goGetPics: () => dispatch(getPics()),
})


export default connect(mapState, mapDispatch)(AllPics)
