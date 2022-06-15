import React from 'react'
import '../css/PicCard.css'

const RATING_TO_CLASS = {
  's': 'rating-safe',
  'q': 'rating-questionable',
  'e': 'rating-explicit',
}

const PicCard = (props) => {
  const onClick = () => {
    props.setPicToCard()
    props.showModal()
  }
  const classes = [
    'pic-card',
    RATING_TO_CLASS[props.rating],
  ]
  return (
    <div className={classes.join(' ')} onClick={onClick}>
      <img src={props.preview_file_url} alt={props.tag_string_character} title={props.tag_string_character}></img>
    </div>
  )
}
export default PicCard