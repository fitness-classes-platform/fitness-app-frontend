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
            <section className="page-details-section">
                <h1>{classData.name}</h1>
                <div className="page-details">
                    <div>
                        <img src={classData.image} alt={classData.name} />
                    </div>
                    <div className="page-details-info">
                        <h2>{classData.location}</h2>
                        <p>📅 {classData.schedule}</p>
                        <p>🏋️‍♀️ {classData.difficulty}</p>
                        <p>📱 {classData.contacts}</p>
                    </div>
                </div>
                <div className="review-details">
                    <h3>Reviews</h3>
                    {reviews.length === 0 ? (
                        <p>No reviews yet for this class.</p>
                    ) : (
                        reviews.map((review) => (
                            review && (
                                <div key={review._id} className="review-info">
                                    <h4>{review.title || "No Title"}</h4>
                                    <p>{review.description || "No Description"}</p>
                                    {review.image ? (
                                        <img src={review.image} alt="Review" />
                                    ) : (
                                        <p>No image</p>
                                    )}

                                    <h5>{review.ranking ?? "No Ranking"} / 5</h5>
                                    {isLoggedIn && review.author === currentUserId && (
                                        <div className="edit-delete">
                                            <Link to={`/review/${review._id}`} className="review-info-edit-btn">
                                                <img src="https://i.imgur.com/urSPuAY.png" alt="Edit" />
                                            </Link>
                                            <button onClick={() => handleDelete(review._id)} className="review-info-delete-btn">
                                                <img src="https://i.imgur.com/wORiqSE.png" alt="Remove" />
                                            </button>
                                        </div>
                                    )}

                                </div>

                            )
                        ))
                    )}
                </div>
            <div className="review-details-btns">
                {isLoggedIn ? (
                    <>
                        <Link to={`/createReviews/${classId}`} className="review-details-btns-review"> Give us your review of this class </Link>
                        <Link to={`/class/edit/${classId}`} className="review-details-btns-edit"> Edit Class </Link>
                    </>
                ) : (
                    <p>Please log in to edit or review this class</p>
                )}
            </div>
            </section>
        </div>
    );

}

export default ClassDetails;