import { useState } from 'react'
import './App.css'
import axios from "axios";
import { Routes, Route } from "react-router-dom"

import Navbar from './components/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <h1>hello</h1>
    </>
  )
}

export default App
