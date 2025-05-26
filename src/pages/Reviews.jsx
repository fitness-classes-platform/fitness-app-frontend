import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import service from "../services/src/services/file-upload.service"

function CreateReviews() {
    const { classId } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ranking, setRanking] = useState("");
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();

        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/movies' POST route
        uploadData.append("image", e.target.files[0]);

        setLoading(true);

        service
            .uploadImage(uploadData)
            .then(response => {
                setImage(response.fileUrl);
            })
            .catch(err => console.log("Error while uploading the file: ", err))
            .finally(() => setLoading(false));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const reviewData = {
            title,
            description,
            ranking: Number(ranking),
            image,
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
                setImage("")
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

            <input type="file" onChange={(e) => handleFileUpload(e)} />

            {image && (
                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Upload review"}
                </button>
            )}
        </form>
    );
}

export default CreateReviews;