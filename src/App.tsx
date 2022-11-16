import React from 'react'
import './App.css'
import PicturesBoard from './components/PicturesBoard/PicturesBoard'
import HeaderController from './components/Header/HeaderController'

function App() {
  return (
    <div className="App">
      <HeaderController />
      <PicturesBoard />
    </div>
  )
}

export default App
