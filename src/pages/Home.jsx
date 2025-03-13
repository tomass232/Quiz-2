import { useState, useEffect } from "react"
import { posData, getInfo, deleteData, patchData } from "../services/fetch"
import "../styles/home.css";

function Home() {
    const [tarea, setTarea] = useState("")
    const [tareas, setTareas] = useState([])
    const [recarga, setRecarga] = useState(false)
    const [mostrar, setMostrar] = useState(false)
    const [editar,setEditar] = useState("")
    async function enviarTarea() {
        const tareaLista = {
            "tareaTexto": tarea,
            "idUsuario": localStorage.getItem("idUsuario"),
            "estado": false,
            "nombreUsuario": localStorage.getItem("nombreUsuario")
        }
        await posData(tareaLista, "tareas")
        obtenerTareas()
    }
    async function obtenerTareas() {
        const response = await getInfo("tareas")
        const filtroTareas = response.filter(tarea => tarea.idUsuario === localStorage.getItem("idUsuario"))
        setTareas(filtroTareas)
    }
    async function eliminarTarea(id) {
        await deleteData("tareas", id)
        setRecarga(!recarga)
    }
    async function editarTarea(id) {
        const tareaAEditar = {
          "tareaTexto":editar        }
        await patchData(tareaAEditar,"tareas",id)
        setRecarga(!recarga)
        setMostrar(!mostrar)
    }
    useEffect(() => {
        obtenerTareas()
    }, [recarga])
    return (
        <>
            <h1>Le damos la bienvenida</h1>
            <input type="text" placeholder="Escribir tarea" onChange={(e) => setTarea(e.target.value)}
            />
            <button onClick={enviarTarea}>Agregar tarea</button>
            <h2>Tareas:</h2>
            <ul>
                {tareas.map((tarea) => (
                    <li key={tarea.id}>
                        {tarea.tareaTexto} - {tarea.nombreUsuario}
                        <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
                        <button onClick={()=>setMostrar(!mostrar)}>Editar</button>
                        {mostrar &&
                            <>
                                <input placeholder="Editar tarea" onChange={(evento)=>setEditar(evento.target.value)} />
                                <button onClick={()=>editarTarea(tarea.id)}>Confirmar edición</button>
                            </>
                        }
                    </li>
                ))}
            </ul>
        </>
    )
}
export default Home
