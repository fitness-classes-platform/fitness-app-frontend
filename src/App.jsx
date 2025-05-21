import { useState } from 'react'
import axios from "axios";
import { Routes, Route } from "react-router-dom"


import Navbar from './components/Navbar';
import SignupPage from "./pages/SignupPage";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import ClassDetails from './pages/ClassDetails';
import IsPrivate from './components/IsPrivate';
import EditClass from './pages/EditClass';

function App() {
  const [classList, setClassList] = useState([])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage classList={classList} />} />
        <Route path="/class/:classId" element={<ClassDetails />} />
        <Route path="/class/edit/:classId" element={ <EditClass> </EditClass>} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </div>
  )
}

export default App
