from fastapi import FastAPI, HTTPException
import json 
from pydantic import BaseModel
# import para o fastAPI funcionar em outra porta (do Next)
from fastapi.middleware.cors import CORSMiddleware

#Classe Tarefa
class Tarefa(BaseModel):
        titulo: str
        descricao : str
        data_entrega: str
        finalizada: bool
        prioridade: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Funções Python
def carregar_tarefas():
    try:
        with open('tasks.json', 'r', encoding="utf-8") as arq:
            tarefas = json.load(arq)

        return tarefas
    except FileNotFoundError:
        return []

def adicionar_tarefa(tarefa):
    tarefas = carregar_tarefas()
    ids = [int (tarefa["id"]) for tarefa in tarefas]
    novo_id = max(ids, default=0) + 1
    nova_tarefa ={
         'id': str(novo_id),
         **tarefa.model_dump() 
    }

    tarefas.append(nova_tarefa)

    with open('tasks.json', 'w', encoding="utf-8") as arq:
        json.dump(tarefas, arq, indent=4, ensure_ascii=False)

    return nova_tarefa

def editar_tarefa(id, tarefa_editada):
    tarefas = carregar_tarefas()
    for tarefa in tarefas:
        if tarefa["id"] == id:
            tarefa.update(tarefa_editada.model_dump())

            with open('tasks.json', 'w', encoding="utf-8") as arq:
                json.dump(tarefas, arq, indent=4, ensure_ascii=False)

            return tarefa

    return None

def remover_tarefa(id):
    tarefas = carregar_tarefas()
    for tarefa in tarefas:
        if tarefa["id"] == id:
            index = tarefas.index(tarefa)
            tarefas.pop(index)

            with open('tasks.json', 'w', encoding="utf-8") as arq:
                json.dump(tarefas, arq, indent=4, ensure_ascii=False)

            return {"mensagem": "A tarefa foi removida com sucesso!"}
              
    return None

#Funções FastAPI
@app.get('/tasks')
def listar_tarefas_api():
    return carregar_tarefas()

@app.post('/tasks')
def adicionar_tarefa_api(tarefa : Tarefa):
    return adicionar_tarefa(tarefa)

@app.get('/tasks/{id}')
def buscar_tarefa_api(id : str):
    tarefas = carregar_tarefas()
    for tarefa in tarefas:
        if tarefa["id"] == id:
            return tarefa

    return {"erro" : "Tarefa não encontrada"}

@app.put('/tasks/{id}')
def editar_tarefa_api(id : str, tarefa_editada : Tarefa):
    resultado = editar_tarefa(id, tarefa_editada)

    if resultado is None:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")

    return resultado

@app.delete('/tasks/{id}')
def remover_tarefa_api(id: str):
    resultado = remover_tarefa(id)

    if resultado is None:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")