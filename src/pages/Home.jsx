import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



function HomePage({onDeleteClass}) {
    const [data, setData] = useState([])
    const [error, setError] = useState(null);

    const handleDelete = (classId) => {
        onDeleteClass(classId);
        setData((prev) => prev.filter((item) => item._id !== classId));
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

    return (
        <div>
            <h1>Classes</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {data.map((item) => {
                return (
                    <div key={item._id}>
                        <h2>{item.name}</h2>
                        <p>{item.location}</p>
                        <img src={item.image} />
                        
                        <div>
                            <Link to={`/class/${item._id}`}> More details </Link>
                            <button onClick={() => handleDelete(item._id)}>Delete</button>
                        </div>
                
                    </div>
                );
            })}

        </div>


    )
}

export default HomePage