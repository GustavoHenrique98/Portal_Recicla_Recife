import { getDOM, getDomAll } from './getDOM.js';

const novaEstrategia = {
    form: getDOM('#formEstrategias'),
    titulo_estrategia: getDOM('#titulo_estrategia'),
    tipo_estrategia: getDOM('#tipo_estrategia'),
    associar_estrategia: getDOM('#associar_estrategia'),
    descricao_estrategia: getDOM('#descricao_estrategia')
};


const organizacao_id = JSON.parse(localStorage.getItem("organizacao")).ID;

window.addEventListener('load', async () => {

    // Carregar eventos da organização
    const eventos = await axios.get(`/api/eventos/events-from-org/${organizacao_id}`);
    if (eventos.data.length > 0) {
        eventos.data.forEach(evento => {
            const option = document.createElement('option');
            option.value = evento.nome_evento;
            option.textContent = evento.nome_evento;
            option.classList.add('opcoes');
            novaEstrategia.associar_estrategia.appendChild(option);
        });
        
    }
    
});



// Evento de submissão do formulário
novaEstrategia.form.addEventListener('submit', async (e) => {
     e.preventDefault();
    const titulo_estrategia = novaEstrategia.titulo_estrategia.value;
    const tipo_estrategia = novaEstrategia.tipo_estrategia.value;
    const descricao_estrategia = novaEstrategia.descricao_estrategia.value;
    const organizacao_id = JSON.parse(localStorage.getItem("organizacao")).ID;
    try {
        const response = await axios.post('/api/estrategias/insert', {
            titulo_estrategia,
            tipo_estrategia,
            descricao_estrategia,
            organizacao_id
        });
        
        
    //Após cadastrar recuperar o valor do evento escolhido e usar para fazer uma requisição e recuperar o id do evento selecionado
    //para assim poder executar a requisição para inserir na tabela de junção.  
    const evento_escolhido = novaEstrategia.associar_estrategia.value;
    
    const responseEventos = await axios.get(`/api/eventos/events-from-org/${organizacao_id}`);
    
    const eventos = responseEventos.data;
    
    const eventoFiltrado = eventos.find(evento => evento.nome_evento === evento_escolhido);

    //Agora precisamos recuperar o ID do evento que acabou de ser cadastrado.
    
    //Fazendo requisição para retornar todos os eventos da organização que está cadastrando
    const responseEstrategias = await axios.get(`/api/estrategias/list/estrategies-from-orgs/${organizacao_id}`);
    const estrategias = responseEstrategias.data;

    const estrategiaFiltrada = estrategias.find(estrategia => 
        estrategia.titulo_estrategia === titulo_estrategia &&
        estrategia.tipo_estrategia === tipo_estrategia &&
        estrategia.descricao_estrategia === descricao_estrategia
    );

    
    try{
        const associarEstrategias  = await axios.post('/api/estrategias/associate',{
            id_evento:eventoFiltrado.ID,
            id_estrategia:estrategiaFiltrada.ID
        });
    
    }catch(error){
        console.log(error.response)
    }
        
    alert(response.data);
        
} catch (error) {
    console.log(error.response.data);
 }


});