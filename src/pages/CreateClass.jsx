import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"


function CreateClass() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [schedule, setSchedule] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [contacts, setContacts] = useState("");

    const navigate = useNavigate();

    const difficultyOptions = ["Intensive", "Medium", "Light"];
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const classData = {
            name,
            location,
            image,
            schedule,
            difficulty,
            contacts: contacts.trim() || undefined,
        };

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/class`, classData)
            .then(() => {
                setName("");
                setLocation("");
                setImage("");
                setSchedule("");
                setDifficulty("");
                setContacts("");

                navigate("/")
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div>
                <label>Location:</label>
                <input value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>

            <div>
                <label>Image URL:</label>
                <input value={image} onChange={(e) => setImage(e.target.value)} required />
            </div>

            <div>
                <label>Schedule:</label>
                <input value={schedule} onChange={(e) => setSchedule(e.target.value)} required />
            </div>

            <div>
                <label>Difficulty:</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
                    <option value="">Select difficulty</option>
                    {difficultyOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Contacts (optional):</label>
                <input value={contacts} onChange={(e) => setContacts(e.target.value)} />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Create Class"}
            </button>

        </form>
    );
}

export default CreateClass;

