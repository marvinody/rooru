import React from 'react'
import './App.css'
import AllPics from './Components/AllPics'
import KeyBindings from './Components/KeyBindings'
import Modal from './Components/Modal'

function App(props) {

  return (
    <div className="App">
      <KeyBindings />

      <div className='mini-container'>
        <AllPics />

      </div>
      <Modal></Modal>
    </div>
  )
}

export default (App)
