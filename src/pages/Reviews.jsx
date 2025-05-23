import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CreateReviews() {
    const { classId } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ranking, setRanking] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); 

        const reviewData = {
            title,
            description,
            ranking: Number(ranking), 
        };

        const storedToken = localStorage.getItem("authToken");

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/review/class/${classId}`, reviewData, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
                setTitle("");
                setDescription("");
                setRanking("");
                navigate(`/class/${classId}`); 
            })
            .catch((error) => {
                console.log("Error loading review data", error);
                setError("Failed to submit the review. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <label>Title:</label>
            <input
                type="text"
                name="Title"
                placeholder="Name of the class"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label>Description:</label>
            <input
                type="text"
                name="Description"
                placeholder="Description of the class"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label>Ranking:</label>
            <input
                type="number"
                name="Ranking"
                placeholder="Rank the class"
                min="0"
                max="5"
                value={ranking}
                onChange={(e) => setRanking(e.target.value)}
            />

            <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Upload review"}
            </button>
        </form>
    );
}

export default CreateReviews;