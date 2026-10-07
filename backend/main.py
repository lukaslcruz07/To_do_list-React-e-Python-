from fastapi import FastAPI   
import json 
from pydantic import BaseModel

class Tarefa(BaseModel):
        titulo: str
        descricao : str
        data_entrega: str
        finalizada: bool
        prioridade: str


app = FastAPI()

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



#Funções FastAPI
@app.get('/tasks')
def listar_tarefas():
    return carregar_tarefas()

@app.post('/tasks')
def adicionar_tarefa_lista(tarefa : Tarefa):
    return adicionar_tarefa(tarefa)

@app.get('/tasks/{id}')
def buscar_tarefa(id):
    tarefas = carregar_tarefas()
    for tarefa in tarefas:
        if tarefa["id"] == id:
            return tarefa

    return {"erro" : "Tarefa não encontrada"}