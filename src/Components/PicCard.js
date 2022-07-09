import React from 'react'
import '../css/PicCard.css'

const RATING_TO_CLASS = {
  'g': 'rating-general',
  's': 'rating-sensitive',
  'q': 'rating-questionable',
  'e': 'rating-explicit',
}

const PicCard = (props, ref) => {
  const onClick = () => {
    props.setPicToCard()
    props.showModal()
  }
  const classes = [
    'pic-card',
    RATING_TO_CLASS[props.rating],
  ]
  if(props.wasLastSelected) {
    classes.push('last-viewed-image')
  }
  return (
    <div className={classes.join(' ')} onClick={onClick} ref={ref}>
      <div className='pic-card-img-container'>
        <img src={props.preview_file_url} alt={props.tag_string_character} title={props.tag_string_character}></img>
        {props.showTriangle && <div className={`triangle ${RATING_TO_CLASS[props.rating]}`}></div>}
      </div>
    </div>
  )
}
export default React.forwardRef(PicCard)