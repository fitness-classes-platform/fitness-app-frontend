import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"


function ClassDetails (){
    const {classId}= useParams();
    const [classData, setClassData]= useState(null)

    useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_API_URL}/api/class/${classId}`)
        .then((response)=>{
            setClassData(response.data)
        })
        .catch((e) => {
            console.log("Error finding classes", e);
        })
    }, [classId])

    if(!classData){
        return <p> Loading </p>
    }


    return(
        <div>
            <img src={classData.image} />
            <h1>{classData.name}</h1>
            <h2>{classData.location}</h2>

            <p>{classData.schedule}</p>
            <p>{classData.difficulty}</p>
            <p>{classData.contacts}</p>

            <div>
                <Link to={`/class/edit/${classId}`}> Edit Class </Link>
            </div>
        </div>
    )
}


export default ClassDetails