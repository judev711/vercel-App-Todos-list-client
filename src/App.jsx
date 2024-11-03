import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false)
  const [Tab, SetTab] = useState(1);
  const [todos, SetTodo] = useState([])
  const [task, setTask] = useState(""); // Initialisé à une chaîne vide
  
  const handleTab = (Tab) => {
    SetTab(Tab);
  };
  const handletask = async () => {
    const trimmedTask = task.trim("")
    if (trimmedTask === ("")){
      alert("veuillez inserer une tache valide !");
      return;
    }
    try {
      
      setLoading(true);
      
      const response = await axios.post("http://localhost:2004/new-task", {task});
      console.log("Réponse of post:", response.data);
      setTask(""); // Effacer le champ de saisie après l'ajout
    } catch (error) { 
      console.error("Erreur:", error); // Gestion des erreurs côté client
      setLoading(false)
      alert("erreur lors de la soumission")
    }finally{
      setLoading(false)
    }
  };
  const getData =  () => {
    axios.get("http://localhost:2004/read-task").then((res) => {
      console.log("RESPONSE OF GET :", res.data)
      SetTodo(res.data.result.slice(-3));
      setLoading(false)
    });
  }
  useEffect(()=>{
    if(loading){
      getData()
    }
   
  },[loading])



  return (
    <>
      <div className="bg-gray-300 w-screen h-screen">
        <div className="flex flex-col justify-center items-center w-screen h-screen gap-3">
          <div>
            <h2 className="font-bold text-xl">ToDo List</h2>
          </div>
          {/* debut du petit formulaire */}
          <form onSubmit={handletask}>
            <div className="flex gap-3">
              <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                type="text"
                placeholder="Enter todo..."
                className="p-2 outline-none border border-blue-600"
              />
              <div
                onClick={() =>handletask()}
                className="bg-blue-600 rounded-md p-2 font-bold cursor-pointer"
              >
                +Add
              </div>
            </div>
          </form>
          {/* fin du formulaire */}
          <div className="flex justify-evenly w-72">
            <p
              onClick={() => handleTab(1)}
              className={`${Tab === 1 ? "text-blue-600" : "text-black"}`}
            >
              All
            </p>
            <p
              onClick={() => handleTab(2)}
              className={`${Tab === 2 ? "text-blue-600" : "text-black"}`}
            >
              Active
            </p>
            <p
              onClick={() => handleTab(3)}
              className={`${Tab === 3 ? "text-blue-600" : "text-black"}`}
            >
              Complete
            </p>
          </div>
          {/* mapping turn on */}
          {todos?.map((todo, idx) => (
            <div key={idx} className="flex justify-between bg-white p-3 w-80 rounded-md shadow-lg">
              <div>
                <p className="font-bold text-lg">{todo.task}</p>
                <p className="text-gray-600 text-xs font-semibold">
                 { new Date(todo.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-800">Status : Active</p>
              </div>
              <div className="flex flex-col text-sm items-start gap-1">
                <button className="text-orange-600 hover:underline">
                  Edit
                </button>
                <button className="text-red-600 hover:underline">Delete</button>
                <button className="text-green-600 hover:underline">
                  Complete
                </button>
              </div>
            </div>
          ))}
          {/* final mapping */}
        </div>
      </div>
    </>
  );
}

export default App;
