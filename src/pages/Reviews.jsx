import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import service from "../services/file-upload.service";

function CreateReviews() {
    const { classId } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ranking, setRanking] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        const file = e.target.files[0];
        uploadData.append("image", file);

        setLoading(true);

        service
            .uploadImage(uploadData)
            .then((response) => {
                setImage(response.fileUrl);
            })
            .catch((err) => {
                console.log("Error while uploading the file: ", err);
                setError("Image upload failed.");
            })
            .finally(() => setLoading(false));
    };

    const handleRemoveImage = () => {
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const reviewData = {
            title,
            description,
            ranking: Number(ranking),
        };

        if (image) {
            reviewData.image = image;
        }

        const storedToken = localStorage.getItem("authToken");

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/review/class/${classId}`, reviewData, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
                setTitle("");
                setDescription("");
                setRanking("");
                setImage(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
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
        <div className="create-reviews-form">
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <label>Title:</label>
                <input
                    type="text"
                    name="Title"
                    placeholder="What do you want to call this review"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label>Description:</label>
                <input
                    type="text"
                    name="Description"
                    placeholder="Give us your best description for this class"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label>Ranking:</label>
                <input
                    type="number"
                    name="Ranking"
                    placeholder="Give us your ranking from 1 to 5"
                    min="0"
                    max="5"
                    value={ranking}
                    onChange={(e) => setRanking(e.target.value)}
                    required
                />

                <label>Image (optional):</label>
                <input type="file" onChange={handleFileUpload} ref={fileInputRef} />

                {image && (
                    <div style={{ margin: "10px 0" }} className="preview-img">
                        <p>Image Preview:</p>
                        <img
                            src={image}
                            alt="Preview"
                            style={{ maxWidth: "200px", borderRadius: "8px" }}
                        />
                        <br />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="delete-preview"
                        >
                            Remove image
                        </button>
                    </div>
                )}

                {loading && <p>Uploading...</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Upload review"}
                </button>
            </form>
        </div>
    );
}

export default CreateReviews;



