
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
    // Subscribe to the AuthContext to gain access to
    // the values from AuthContext.Provider `value` prop
    const {
        isLoggedIn,
        user,
        logOutUser
    } = useContext(AuthContext);


    return (
        <div>
            <nav className="navbar">
                <div className="navbar-left">
                    <NavLink to="/">
                        <img src="https://i.imgur.com/KqAeA7B.png" alt="app-logo" />
                    </NavLink>
                </div>

                <div className="navbar-center">
                    <div>
                        <NavLink to="/">
                            <button className="home-btn">HOME</button>
                        </NavLink>
                    </div>

                    <div>

                        {isLoggedIn && (
                            <NavLink to="/createClass">
                                <button className="createClass-btn">CREATE CLASS</button>
                            </NavLink>
                        )}

                    </div>

                    <div>

                        <NavLink to="/about">
                            <button className="aboutUs-btn">ABOUT US</button>
                        </NavLink>

                    </div>

                </div>

                <div className="navbar-user">

                    {isLoggedIn && (
                        <>
                            <h4>{user && user.name}</h4>
                            <button className="logout-btn" onClick={logOutUser}>Logout</button>
                        </>
                    )}

                    {!isLoggedIn && (
                        <>
                            <Link to="/login"> <button className="login-btn">Login</button> </Link>
                            <Link to="/signup"> <button className="signup-btn">Sign Up</button> </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
