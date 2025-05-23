import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";



function HomePage({onDeleteClass , classes}) {
    const [data, setData] = useState([])
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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
        <div>
            <h1>Classes</h1>
            <SearchBar onSearch={handleSearch} />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {filteredData.map((item) => (
                <div key={item._id} className="homePage-card">
                    <h2>{item.name}</h2>
                    <p>{item.location}</p>
                    <img src={item.image} />
                    <div className="buttons">
                        <button className="details-btn">
                        <Link to={`/class/${item._id}`}> More details </Link>
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="delete-btn">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HomePage