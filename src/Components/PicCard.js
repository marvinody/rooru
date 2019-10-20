import React from 'react'
import '../css/PicCard.css'
export default function (props) {
  return (
    <div className='pic-card'>
      <img src={props.preview_file_url} alt={props.tag_string}></img>
    </div>
  )
}
