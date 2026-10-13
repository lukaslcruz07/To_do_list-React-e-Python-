"use client"

import { useState } from "react"

export default function FormsTasks(){

    const [nomeTituloTarefa, setNomeTituloTarefa] = useState("")
    const [descricaoTarefa, setDescricaoTarefa] = useState("")
    const [dataTarefa, setDataTarefa] = useState("")
    const [prioridadeTarefa, setPrioridadeTarefa] = useState("")

    const [form, setForm] = useState({
        titulo: "",
        descricao: "",
        data: "",
        prioridade: ""
    })
    
    const hadleSubmit = (event => {
        event.preventDefault()

        console.log(form);

        setForm({
            titulo: "",
            descricao: "",
            data: "",
            prioridade: ""
        })
    })

    return(
        <div>
            <h2>Atribua uma nova tarefa:</h2>
            <form onSubmit={hadleSubmit}>
                <fieldset>
                    <legend>NOVA TAREFA</legend>
                    <label htmlFor="tituloTarefa">Título Da Tarefa:</label>
                    <input 
                    name="tituloTarefa"
                    type="text" 
                    value={form.titulo} 
                    placeholder="Título da tarefa"

                    onChange={(e) => 
                        setForm((prev) => 
                            ({...prev,
                            titulo: e.target.value
                        }))
                    }
                    />
                    <label htmlFor="descricaoTarefa">Descrição:</label>
                    <textarea 
                    name="descricaoTarefa"
                    value={form.descricao} 
                    placeholder="Descrição..." 
                    onChange={(e) => 
                        setForm((prev) => 
                            ({...prev, 
                            descricao: e.target.value
                        }))
                    }                  
                    ></textarea>
                    <label htmlFor="dataEntregaTarefa">Data De Entrega:</label>
                    <input
                    type="date" 
                    name="dataEntregaTarefa"
                    value={form.data}
                    onChange={(e) =>
                        setForm((prev) => 
                            ({...prev, 
                            data: e.target.value
                        }))
                    }
                    />
                    <label htmlFor="prioridadeTarefa">Nivel Da Prioridade:</label>
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
                </fieldset>
                <button type="submit">Criar tarefa</button>
            </form>
        </div>
    )
    
}