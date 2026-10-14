"use client"

import { useState } from "react"
import NoteComponent from "./NoteComponent"

const TASKS_CAMINHO = "http://127.0.0.1:8000"
const classeLabel = "mb-2 block text-sm font-medium text-gray-700"
const classeInputTD = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"

export default function FormsTasks(){

    const [form, setForm] = useState({titulo: "", descricao: "", data: "", prioridade: ""})
    const [note, setNote] = useState("")
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        if(!form.titulo.trim() || !form.data || !form.prioridade){
            return alert("Alguma das informações nescessárias não estão preenchidas!")
        }

        console.log(form);
        const Tarefa = {
            titulo : form.titulo,
            descricao : form.descricao || "Nenhuma descrição sobre esta tarefa",
            data_entrega : form.data,
            prioridade : form.prioridade
        }
        try{
            const response = await fetch(`${TASKS_CAMINHO}/tasks`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(Tarefa)
            })
            if(response.ok){
                setNote("Tarefa criada com sucesso!")
                setForm({titulo: "", descricao: "", data: "", prioridade: ""})
                return await response.json()
            }
            else{setNote("Erro ao criar a tarefa.")}
                
            
        }catch(error){
            setNote("Não foi possivel se conectar ao servidor!")
            console.log(error);
        }
    }

    return(
        <div className="mx-auto w-full max-w-2xl p-6">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800 text-center">Atribua uma nova tarefa:</h2>
            <form className="space-y-6"onSubmit={handleSubmit}>
                <fieldset className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    <legend className="px-2 text-sm font-semibold tracking-wide text-gray-600">NOVA TAREFA</legend>
                    <div className="space-y-2">
                        <label className={classeLabel} htmlFor="tituloTarefa">Título Da Tarefa:</label>
                        <input 
                        id="tituloTarefa"
                        type="text" 
                        value={form.titulo} 
                        placeholder="Título da tarefa"
                        className={classeInputTD}
                        onChange={(e) => 
                            setForm((prev) => 
                                ({...prev,
                                titulo: e.target.value
                            }))
                        }
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className={classeLabel} htmlFor="descricaoTarefa">Descrição:</label>
                        <textarea
                        className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" 
                        id="descricaoTarefa"
                        value={form.descricao} 
                        placeholder="Descrição..." 
                        onChange={(e) => 
                            setForm((prev) => 
                                ({...prev, 
                                    descricao: e.target.value
                                }))
                            }                  
                            ></textarea>
                    </div>
                    <label className = {classeLabel} htmlFor="dataEntregaTarefa">Data De Entrega:</label>
                    <input
                    type="date" 
                    id="dataEntregaTarefa"
                    value={form.data}
                    className={classeInputTD}
                    onChange={(e) =>
                        setForm((prev) => 
                            ({...prev, 
                            data: e.target.value
                        }))
                    }
                    />
                    <div className="space-y-2">
                        <label className = {classeLabel} htmlFor="prioridadeTarefa">Nivel Da Prioridade:</label>
                            <select 
                            value={form.prioridade} 
                            onChange={(e) => 
                                setForm((prev) =>
                                    ({...prev, 
                                    prioridade: e.target.value
                                }))
                            }
                            >
                                <option disabled value={""}>Selecione</option>
                                <option
                                value={"Extrema"}
                                >Extrema</option>
                                <option 
                                value={"Alta"}
                                >Alta</option>
                                <option value={"Média"}
                                >Média</option>
                                <option value={"Baixa"}
                                >Baixa</option>
                        </select>
                    </div>
                </fieldset>
                <button className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 active:bg-indigo-800" type="submit">Criar Tarefa</button>
            </form>
            {note && <NoteComponent>{note}</NoteComponent>}
        </div>
    )
    
}