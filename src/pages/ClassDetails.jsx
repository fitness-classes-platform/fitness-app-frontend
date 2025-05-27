import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context";  // <== IMPORT
import service from "../services/src/services/file-upload.service"

function ClassDetails() {
    const { classId } = useParams();
    const [classData, setClassData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const {
        isLoggedIn,
        user,
        logOutUser
    } = useContext(AuthContext);

    const currentUserId = user?._id;

    const handleDelete = (reviewId) => {
        const confirmed = window.confirm("Are you sure you want to delete this review?");
        if (!confirmed) return;

        const storedToken = localStorage.getItem("authToken");

        axios
            .delete(`${import.meta.env.VITE_API_URL}/api/review/${reviewId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
                setReviews((prev) => prev.filter((review) => review._id !== reviewId));
            })
            .catch((error) => {
                console.error("Error deleting review:", error);
            });
    };

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/class/${classId}`)
            .then((response) => {
                setClassData(response.data);
                setReviews(response.data.reviews); // Set reviews directly
            })
            .catch((e) => {
                console.log("Error finding class details", e);
                setError("Failed to load class details. Please try again later.");
            });
    }, [classId]);


    /* useEffect(() => {
         service.getReviews()
             .then((data) => {
                 // console.log("data", data);
                 setReviews(data);
             })
             .catch((err) => console.log(err));
     }, []); //  <-- This effect will run only once, after the initial render*/

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!classData) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <section className="page-details">
                <img src={classData.image} alt={classData.name} />
                <h1>{classData.name}</h1>
                <h2>{classData.location}</h2>
                <p>{classData.schedule}</p>
                <p>{classData.difficulty}</p>
                <p>{classData.contacts}</p>

                <h3>Reviews:</h3>
                {reviews.length === 0 ? (
                    <p>No reviews yet for this class.</p>
                ) : (
                    reviews.map((review) => (
                        review && (
                            <div key={review._id}>
                                <h3>{review.title || "No Title"}</h3>
                                <p>{review.description || "No Description"}</p>
                                {review.image ? (
                                    <img src={review.image} alt="Review" style={{ maxWidth: '200px' }} />
                                ) : (
                                    <p>No image</p>
                                )}

                                <p>Ranking: {review.ranking ?? "No Ranking"}</p>
                                {isLoggedIn && review.author === currentUserId && (
                                    <>
                                        <Link to={`/review/${review._id}`}> Edit Review </Link>
                                        <button onClick={() => handleDelete(review._id)}>Delete Review</button>
                                    </>
                                )}
                            </div>
                        )
                    ))
                )}
            </section>
            {isLoggedIn ? (
                <>
                    <Link to={`/class/edit/${classId}`}> Edit Class </Link>
                    <Link to={`/createReviews/${classId}`}> Give us your review of this class </Link>
                </>
            ) : (
                <p>Please log in to edit or review this class.</p>
            )}
        </div>
    );
}

export default ClassDetails;