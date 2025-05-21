import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditClass() {
    const { classId } = useParams();
    const navigate = useNavigate();

    const [classImage, setClassImage] = useState("");
    const [className, setClassName] = useState("");
    const [classLocation, setClassLocation] = useState("");
    const [classSchedule, setClassSchedule] = useState("");
    const [classDifficulty, setClassDifficulty] = useState("");
    const [classContacts, setClassContacts] = useState("");

   
    useEffect(() => {
        if (classId) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/api/class/${classId}`)
                .then((response) => {
                    const data = response.data;
                    setClassImage(data.image || "");
                    setClassName(data.name || "");
                    setClassLocation(data.location || "");
                    setClassSchedule(data.schedule || "");
                    setClassDifficulty(data.difficulty || "");
                    setClassContacts(data.contacts || "");
                })
                .catch((error) => {
                    console.log("Error loading class data", error);
                });
        }
    }, [classId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = {
            image: classImage,
            name: className,
            location: classLocation,
            schedule: classSchedule,
            difficulty: classDifficulty,
            contacts: classContacts,
        };

        const storedToken = localStorage.getItem("authToken");

        axios.put(
                `${import.meta.env.VITE_API_URL}/api/class/${classId}`, 
                updatedData, 
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(() => {
                navigate(`/class/${classId}`); 
            })
            .catch((error) => {
                console.log("Error updating class data", error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h4>Name</h4>
                <input
                    type="text"
                    name="name"
                    placeholder="Class Name"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                />

                <h4>Image</h4>
                <input
                    type="text"
                    name="image"
                    placeholder="Class Image"
                    value={classImage}
                    onChange={(e) => setClassImage(e.target.value)}
                />

                <h4>Location</h4>
                <input
                    type="text"
                    name="location"
                    placeholder="Class Location"
                    value={classLocation}
                    onChange={(e) => setClassLocation(e.target.value)}
                />

                <h4>Schedule</h4>
                <input
                    type="text"
                    name="schedule"
                    placeholder="Class Schedule"
                    value={classSchedule}
                    onChange={(e) => setClassSchedule(e.target.value)}
                />

                <h4>Difficulty</h4>
                <input
                    type="text"
                    name="difficulty"
                    placeholder="Class Difficulty"
                    value={classDifficulty}
                    onChange={(e) => setClassDifficulty(e.target.value)}
                />

                <h4>Contacts</h4>
                <input
                    type="text"
                    name="contacts"
                    placeholder="Class Contacts"
                    value={classContacts}
                    onChange={(e) => setClassContacts(e.target.value)}
                />

                <button type="submit">Update Class</button>
            </form>
        </div>
    );
}

export default EditClass;