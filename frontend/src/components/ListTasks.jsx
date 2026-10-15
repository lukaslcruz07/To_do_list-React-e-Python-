"use client"

import { useEffect, useState } from "react"
import { URL_API } from "./FormsTasks"
import TasksItem from "./Tasksitem"

export default function ListTasks({children}){

    const [tarefas, setTarefas] = useState([])

    useEffect(() => {
        async function carregarTarefas(){
            try{
                const response = await fetch(`${URL_API}/tasks`)
                if(!response.ok){
                    throw new Error(`Error na requisição: ${response.status}`)
                }
                const dados = await response.json() 
                setTarefas(dados)
            }catch(error){
                console.error(`Ocorreu um erro:`, error)
            }   

        }
        carregarTarefas()
    }, [])



    return(
        <div className="mx-auto w-full max-w-3xl px-4 py-6">
            <h3 className="mb-5 text-2xl font-bold text-gray-800">Lista de Tarefas</h3>
            <ul className="flex flex-col gap-3">
                {tarefas.map((tarefa) => {
                    return <TasksItem key={tarefa.id} tarefa={tarefa}/>
                })}
            </ul>
        </div>
    )
}