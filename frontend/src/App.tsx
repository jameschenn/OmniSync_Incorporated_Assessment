import { useState } from 'react'
import Card from './components/card/Card';
import './styles/globals.scss';

function App() {

  return (
    <>
      <p>Hi. In Progress. Thanks for checking this commit :D</p>
      <Card number={1} clicks={1} firstClick={null} />
    </>
  )
}

export default App
