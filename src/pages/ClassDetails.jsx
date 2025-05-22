import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"


function ClassDetails() {
    const { classId } = useParams();
    const [classData, setClassData] = useState(null)
    const [reviews, setReviews] = useState([])


    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/class/${classId}`)
            .then((response) => {
                setClassData(response.data)
            })
            .catch((e) => {
                console.log("Error finding classes", e);
            })

        axios
            .get(`${import.meta.env.VITE_API_URL}/api/review/class/${classId}`)
            .then((response) => {
                setReviews(response.data);
            })
            .catch((e) => {
                console.log("Error loading reviews", e);
            });
    }, [classId])

    if (!classData) {
        return <p> Loading </p>
    }



    return (
        <div>
            <img src={classData.image} />
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
                            <p>Ranking: {review.ranking ?? "No Ranking"}</p>
                        </div>
                    )
                ))
            )}
            <Link to={`/class/edit/${classId}`}> Edit Class </Link>
            <Link to={`/createReviews/${classId}`}> Give us your review of this class </Link>
        </div>
    )
}


export default ClassDetails