import { useState } from 'react'
import axios from "axios";
import { Routes, Route } from "react-router-dom"

import IsPrivate from './components/IsPrivate'

import Navbar from './components/Navbar';
import SignupPage from "./pages/SignupPage";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import ClassDetails from './pages/ClassDetails';
import CreateClass from './pages/CreateClass';
import EditClass from './pages/EditClass';
<<<<<<< HEAD
=======
import CreateReviews from './pages/Reviews';

>>>>>>> e0557dfe3486251e12fb845ac971aac37c53150c

function App() {
  const [classList, setClassList] = useState([])
  const [error, setError] = useState(null);
  const [filteredClasses, setFilteredClasses] = useState([]);

  const handleDelete = (classId) => {
    const confirmed = window.confirm("Are you sure you want to delete this city?");
    if (!confirmed) return;

    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/class/${classId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setClassList((prev) => prev.filter((cls) => cls._id !== classId));
      })
      .catch((err) => {
        console.error("Error deleting class", err);
        setError("Failed to delete the class. Please try again.");
      });
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage classes={filteredClasses} onDeleteClass={handleDelete} />} />
        <Route path="/class/:classId" element={<ClassDetails />} />
        <Route path="/class/edit/:classId" element={<EditClass />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createClass" element={<IsPrivate><CreateClass /></IsPrivate>} />
        <Route path="/createReviews/:classId" element={<CreateReviews />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </div>
  )
}

export default App

