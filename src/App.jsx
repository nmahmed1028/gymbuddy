import { useState } from 'react'
import './App.css'
import NavBar from './components/Header/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <br/>
      <h3 className="read-the-docs">Workout Tracker</h3>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
    </>
  )
}

export default App
