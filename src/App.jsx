import { useState } from 'react'
import './App.css'
import axios from "axios";
import { Routes, Route } from "react-router-dom"

import Navbar from './components/Navbar';
import SignupPage from "./pages/SignupPage";
import LoginPage from './pages/LoginPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path = "/signup" element={<SignupPage />} />
        <Route path = "/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
