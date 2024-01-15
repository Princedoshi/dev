import { useState } from 'react'

import './App.css'
import './index.css'
import Register from './auth/Register'
import Reset from './auth/Reset'

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
