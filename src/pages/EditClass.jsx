import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditClass() {
  const { classId } = useParams();
  const navigate = useNavigate();

  const [classImage, setClassImage] = useState(""); // URL da imagem atual
  const [newImageFile, setNewImageFile] = useState(null); // novo ficheiro (se houver)
  const [className, setClassName] = useState("");
  const [classLocation, setClassLocation] = useState("");
  const [classSchedule, setClassSchedule] = useState("");
  const [classDifficulty, setClassDifficulty] = useState("");
  const [classContacts, setClassContacts] = useState("");

  const difficultyOptions = ["Intensive", "Medium", "Light"];
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const formData = new FormData();
    formData.append("name", className);
    formData.append("location", classLocation);
    formData.append("schedule", classSchedule);
    formData.append("difficulty", classDifficulty);
    if (classContacts.trim()) {
      formData.append("contacts", classContacts.trim());
    }

    if (newImageFile) {
      formData.append("image", newImageFile);
    } else {
      formData.append("image", classImage);
    }

    const storedToken = localStorage.getItem("authToken");

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/class/${classId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(() => {
        navigate(`/class/${classId}`);
      })
      .catch((error) => {
        console.log("Error updating class data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="edit-form">
      <form onSubmit={handleSubmit}>
        <h4>Name</h4>
        <input
          type="text"
          name="name"
          placeholder="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />

        <h4>Current Image</h4>
        {classImage && (
          <img src={classImage} alt="Class" style={{ width: "150px", marginBottom: "10px" }} />
        )}

        <h4>Change Image</h4>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewImageFile(e.target.files[0])}
        />

        <h4>Location</h4>
        <input
          type="text"
          name="location"
          placeholder="Class Location"
          value={classLocation}
          onChange={(e) => setClassLocation(e.target.value)}
          required
        />

        <h4>Schedule</h4>
        <input
          type="text"
          name="schedule"
          placeholder="Class Schedule"
          value={classSchedule}
          onChange={(e) => setClassSchedule(e.target.value)}
          required
        />

        <h4>Difficulty</h4>
        <select
          name="difficulty"
          value={classDifficulty}
          onChange={(e) => setClassDifficulty(e.target.value)}
          required
        >
          <option value="">Select Difficulty</option>
          {difficultyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <h4>Contacts</h4>
        <input
          type="text"
          name="contacts"
          placeholder="Class Contacts"
          value={classContacts}
          onChange={(e) => setClassContacts(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Class"}
        </button>
      </form>
    </div>
  );
}

export default EditClass;
