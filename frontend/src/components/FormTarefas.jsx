export default function FormTarefa(){

    return( 
        <form>
            <h1>Atribua uma nova tarefa:</h1>,
            <fieldset>
                <legend>NOVA TAREFA</legend>
                <label htmlFor="tituloTarefa">Título Da Tarefa:</label>
                <input type="text" id="tituloTarefa" placeholder="Título da tarefa"/>
                <label htmlFor="descricaoTarefa">Descrição:</label>
                <textarea name="descricaoTarefa" id="descricaoTarefa" placeholder="Descrição..."></textarea>
                <label htmlFor="dataEntregaTarefa">Data De Entrega:</label>
                <input type="date" id="dataEntregaTarefa"/>
                <label htmlFor="prioridadeTarefa">Nivel Da Prioridade:</label>
                    <select name="prioridadeTarefa" id="prioridadeTarefa">
                        <option value="null" disabled selected>Selecione</option>
                        <option value="extrema">Extrema</option>
                        <option value="alta">Alta</option>
                        <option value="média">Média</option>
                        <option value="baixa">Baixa</option>
                    </select>
            </fieldset>
        </form> 
    )
    
}