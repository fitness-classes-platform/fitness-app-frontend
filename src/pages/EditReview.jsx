import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/file-upload.service";

function EditReview() {
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ranking, setRanking] = useState(1);
  const [image, setImage] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (reviewId) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/review/${reviewId}`)
        .then((response) => {
          const data = response.data;
          setTitle(data.title || "");
          setDescription(data.description || "");
          setRanking(data.ranking || 1);
          setImage(data.image || null);
          setImageRemoved(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        })
        .catch((error) => {
          console.log("Error loading review", error);
          setError("Failed to load review data.");
        });
    }
  }, [reviewId]);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    const file = e.target.files[0];
    uploadData.append("image", file);

    setLoading(true);
    setError(null);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setImage(response.fileUrl);
        setImageRemoved(false);
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
        setError("Image upload failed.");
      })
      .finally(() => setLoading(false));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageRemoved(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedReview = {
      title,
      description,
      ranking,
    };

    if (imageRemoved) {
      updatedReview.image = null;
    } else if (image) {
      updatedReview.image = image;
    }

    const storedToken = localStorage.getItem("authToken");

    setLoading(true);
    setError(null);

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/review/${reviewId}`, updatedReview, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.log("Error updating review", error);
        setError("Failed to update the review.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="create-reviews-form">
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you want to call this review"
          required
        />

        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Give us your best description for this class"
          required
        />

        <label>Ranking (1–5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={ranking}
          onChange={(e) => setRanking(Number(e.target.value))}
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
            <button type="button" onClick={handleRemoveImage} className="delete-preview">
              Remove image
            </button>
          </div>
        )}

        {loading && <p>{loading ? "Uploading..." : ""}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Review"}
        </button>
      </form>
    </div>
  );
}

export default EditReview;

