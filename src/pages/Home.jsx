import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context";  // <== IMPORT



function HomePage({ onDeleteClass, classes }) {
    const [data, setData] = useState([])
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const {
        isLoggedIn,
        user,
        logOutUser
    } = useContext(AuthContext);

    const handleDelete = (classId) => {
        const confirmed = window.confirm("Are you sure you want to delete this class?");
        if (!confirmed) return;

        onDeleteClass(classId);
        setData((prev) => prev.filter((item) => item._id !== classId));
    };

    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase());
    };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/class`)
            .then((response) => {
                setData(response.data)
            })
            .catch((e) => {
                console.log("Error finding classes", e);
                setError("Failed to load classes. Please try again later.");
            })

    }, []);

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="container">
            <SearchBar onSearch={handleSearch} />
            <section className="homePage">
                <div className="homePage-card">
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {filteredData.map((item) => (
                        <div key={item._id} className="fitness-card">
                            <img src={item.image} />
                            <div className="fitness-card-content">
                                <div className="fitness-card-header">
                                    <h2>{item.name}</h2>
                                    <p>📍{item.location}</p>
                                </div>
                                <div className="buttons">
                                    <Link to={`/class/${item._id}`} className="details-btn">
                                        More details
                                    </Link>
                                    {isLoggedIn && (
                                        <button onClick={() => handleDelete(item._id)} className="delete-btn">Delete</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default HomePage