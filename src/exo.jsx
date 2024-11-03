const axios = "axios"
import { useState,useEffect } from "react";
const [task, setTask]=useState("")
const [todos,SetTodo]=useState([])
const [loading, setLoading]=useState(false)

const handletask = async () =>{
  try 
  {
     const response = await axios.post("http://localhost:2004/new-task", { task });
     setTask("")
     console.log("infos:", response.data)
  } catch (error) {
    console.error("error", error)
  }
}

const getData = () =>{
  axios.get("http://localhost:2004/read-task").then(res=>{
    console.log(res.data)
    SetTodo(res.data.result)
  }) 
}

useEffect(()=>{
  if(loading){
    getData()
  }
},[loading])