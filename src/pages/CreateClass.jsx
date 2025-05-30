import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateClass() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [imageFile, setImageFile] = useState(null); // <- imagem em vez de URL
    const [schedule, setSchedule] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [contacts, setContacts] = useState("");

    const navigate = useNavigate();
    const difficultyOptions = ["Intensive", "Medium", "Light"];
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("location", location);
        formData.append("schedule", schedule);
        formData.append("difficulty", difficulty);
        if (contacts.trim()) {
            formData.append("contacts", contacts.trim());
        }
        if (imageFile) {
            formData.append("image", imageFile); // <- nome deve coincidir com o esperado pelo backend
        }

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/class`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                setName("");
                setLocation("");
                setImageFile(null);
                setSchedule("");
                setDifficulty("");
                setContacts("");
                navigate("/class");
            })
            .catch((error) => {
                console.log("Error creating class", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="create-class-form">
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
                    <label>Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        required
                    />
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
        </div>
    );
}

export default CreateClass;

