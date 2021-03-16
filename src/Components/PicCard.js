import React from 'react'
import '../css/PicCard.css'

const RATING_TO_CLASS = {
  's': 'rating-safe',
  'q': 'rating-questionable',
  'e': 'rating-explicit',
}

export default function (props) {
  const onClick = () => {
    props.setPicToCard()
    props.showModal()
  }
  const classes = [
    'pic-card',
    RATING_TO_CLASS[props.rating]
  ]
  return (
    <div className={classes.join(' ')} onClick={onClick}>
      <img src={props.preview_file_url} alt={props.tag_string} title={props.tag_string}></img>
    </div>
  )
}
