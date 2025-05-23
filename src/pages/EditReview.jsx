import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditReview() {
    const { reviewId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ranking, setRanking] = useState(1);

    useEffect(() => {
        if (reviewId) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/api/review/${reviewId}`)
                .then((response) => {
                    const data = response.data;
                    setTitle(data.title || "");
                    setDescription(data.description || "");
                    setRanking(data.ranking || 1);
                })
                .catch((error) => {
                    console.log("Error loading review", error);
                });
        }
    }, [reviewId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedReview = {
            title,
            description,
            ranking
        };

        const storedToken = localStorage.getItem("authToken");

        axios
            .put(
                `${import.meta.env.VITE_API_URL}/api/review/${reviewId}`,
                updatedReview,
                {
                    headers: { Authorization: `Bearer ${storedToken}` }
                }
            )
            .then(() => {
                navigate(-1);
            })
            .catch((error) => {
                console.log("Error updating review", error);
            });
    };

    return (
        <div>
            <h2>Edit Review</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Ranking (1–5):</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={ranking}
                    onChange={(e) => setRanking(Number(e.target.value))}
                />

                <button type="submit">Update Review</button>
            </form>
        </div>
    );
}

export default EditReview;
