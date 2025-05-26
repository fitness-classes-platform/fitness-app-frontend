// src/services/file-upload.service.js

import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005/api"
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

const getReviews = (classId) => {
    return api.get(`/review/class/${classId}`)
        .then((res) => res.data)
        .catch(errorHandler);
};

const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("image", file); // adjust "image" if your backend expects a different field name
  
    return api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => res.data)
    .catch(errorHandler);
  };

  
  

  const createReview = (classId, newReview, token) => {
    return api.post(`/review/class/${classId}`, newReview, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => res.data)
    .catch(errorHandler);
  };

export default {
  getReviews,
  uploadImage,
  createReview
};
