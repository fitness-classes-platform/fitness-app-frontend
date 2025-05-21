import axios from "axios"
import { useEffect, useState } from "react";



function HomePage() {
    const [data, setData]= useState([])
    const [error, setError] = useState(null); 

useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/api/class`)
    .then((response)=>{
        setData(response.data)
    })
    .catch((e) => {
        console.log("Error finding cities", e);
        setError("Failed to load cities. Please try again later.");
      })

}, []);

    return(
    <div>
        <h1>Classes</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {data.map((item)=>{
            <li key={item._id}>{item.name}</li>

        })}

    </div>


    )
}
export default HomePage