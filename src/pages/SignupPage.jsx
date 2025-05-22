import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";


function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);


  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setErrorMessage("All fields are mandatory");
      return;
    }

    const requestBody = { email, password, name };

    axios.post(`${API_URL}/auth/signup`, requestBody, { withCredentials: true })
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };


  return (
    <div className="signup">
      <div className="signupPage">
        <h1>Sign Up</h1>

        <form onSubmit={handleSignupSubmit} className="signupPageForm">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <label>Username</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleName}
          />

          <button type="submit">Create Account</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Already have an account?</p>
        <Link to={"/login"} className="signupPageLink"> Login</Link>
      </div>
    </div>
  )
}

export default SignupPage;
