
import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);


  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();

        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div className="signin">
      <div className="loginPage">
        <h1>Login</h1>

        <form onSubmit={handleLoginSubmit} className="loginPageForm">
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

          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Don't have an account yet?</p>
        <Link to={"/signup"} className="loginPageLink"> Sign Up</Link>
      </div>
    </div>
  )
}

export default LoginPage;

