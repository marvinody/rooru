import React from 'react'
import './App.css'
import AllPics from './Components/AllPics'
import KeyBindings from './Components/KeyBindings'
import Modal from './Components/Modal'
import SearchBar from './Components/SearchBar'
import Settings from './Components/Settings'
import AboutPage from './Components/AboutPage'

function App(props) {

  return (
    <div className="App">
      <KeyBindings />

      <div className='mini-container'>
        <SearchBar></SearchBar>
        <AllPics />
        <Settings />
        <AboutPage />

      </div>
      <Modal></Modal>
    </div>
  )
}

export default (App)
