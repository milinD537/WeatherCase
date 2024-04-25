import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import weatherJSON from './lib/apiDummy.json'

function App() {
  const [count, setCount] = useState(0)
  const date = new Date(weatherJSON.current.dt * 1000);

  return (
    <>
      <div>{date.toString()}</div>
    </>
  )
}

export default App
