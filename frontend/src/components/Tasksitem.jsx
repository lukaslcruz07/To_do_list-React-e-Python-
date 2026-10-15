export default function TasksItem({ tarefa }){

    return(
        <li className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div className="flex min-w-0 flex-col gap-2">
                <h4 className="break-words text-lg font-semibold text-gray-800">{tarefa.titulo}</h4>
                <p className="text-sm text-gray-500">Entrega: {tarefa.data_entrega}</p>
                <span 
                className={`card-prioridade prioridade-${tarefa.prioridade.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>
                    Prioridade: {tarefa.prioridade}
                </span>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <button 
                type="button"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    tarefa.finalizada
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                >
                    {tarefa.finalizada ? "Finalizada" : "Não concluída"}
                </button>
                <button type="button"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
                >
                    Editar
                </button>
            </div>
        </li>
    )
}