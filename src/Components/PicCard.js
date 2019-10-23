import React from 'react'
import '../css/PicCard.css'
export default function (props) {
  const onClick = () => {
    props.setPicToCard()
    props.showModal()
  }
  return (
    <div className='pic-card' onClick={onClick}>
      <img src={props.preview_file_url} alt={props.tag_string} title={props.tag_string}></img>
    </div>
  )
}
