import React from 'react'
import { ControlPanel } from './components/ControlPanel';
import { Game } from './components/Game'
import { Leaderboard } from './components/Leaderboard'
import './style/index.css';

function App() {

  return (
    <main>
      <Leaderboard/>
      <Game/>
      <ControlPanel/>
    </main>
  )
}

export default App
