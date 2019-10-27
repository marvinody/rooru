import React from 'react'
import './App.css'
import AllPics from './Components/AllPics'
import Modal from './Components/Modal'

function App(props) {

  return (
    <div className="App">
      <div className='mini-container'>
        <AllPics />

      </div>
      <Modal></Modal>
    </div>
  )
}

export default (App)
