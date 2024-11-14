// import {getDOM , getDomAll} from './getDOM.js';

// const novaEstrategia = {
//     form:getDOM('#formEstrategias'),
//     titulo_estrategia:getDOM('#titulo_estrategia'),
//     tipo_estrategia:getDOM('#tipo_estrategia'),
//     associar_estrategia:getDOM('#associar_estrategia'),
//     descricao_estrategia: getDOM('#descricao_estrategia')
// }



// //Ao carregar a página
// window.addEventListener('load',async()=>{
//     const organizacao_id = JSON.parse(localStorage.getItem("organizacao")).ID;
    
//     const eventos = await axios.get(`/api/eventos/events-from-org/${organizacao_id}`);
//     if(eventos.data.length > 0){
//         eventos.data.forEach(eventos => {
//             console.log(eventos.nome)
//             const option = document.createElement('option');
//             option.value = eventos.id; // Ajuste de acordo com o campo de ID do evento
//             option.textContent = eventos.nome_evento; // Ajuste de acordo com o campo de nome do evento
//             novaEstrategia.associar_estrategia.appendChild(option);
//         });

//     }
// });

// novaEstrategia.form.addEventListener('submit', async(e)=>{
//     e.preventDefault();

//     const titulo_estrategia = novaEstrategia.titulo_estrategia.value;
//     const tipo_estrategia = novaEstrategia.tipo_estrategia.value;
//     const descricao_estrategia = novaEstrategia.descricao_estrategia.value;
//     const organizacao_id = JSON.parse(localStorage.getItem("organizacao")).ID;
//     try{
//         const response = await axios.post('/api/estrategias/insert',{
//             titulo_estrategia,
//             tipo_estrategia,
//             descricao_estrategia,
//             organizacao_id
            
//         });

//         const evento_escolhido = novaEstrategia.associar_estrategia.value;
//         console.log(evento_escolhido)

//         alert(response.data);
//     }catch(error){
//         console.log(error.response.data);
//     }
// });






import { getDOM, getDomAll } from './getDOM.js';

const novaEstrategia = {
    form: getDOM('#formEstrategias'),
    titulo_estrategia: getDOM('#titulo_estrategia'),
    tipo_estrategia: getDOM('#tipo_estrategia'),
    associar_estrategia: getDOM('#associar_estrategia'),
    descricao_estrategia: getDOM('#descricao_estrategia')
};

const arrEventos = [];
// Ao carregar a página adiciona todos os eventos cadastrados até o momento.
window.addEventListener('load', async () => {
    const organizacao_id = JSON.parse(localStorage.getItem("organizacao")).ID;

    // Carregar eventos da organização
    const eventos = await axios.get(`/api/eventos/events-from-org/${organizacao_id}`);
    if (eventos.data.length > 0) {
        eventos.data.forEach(evento => {
            const option = document.createElement('option');
            option.value = evento.id; // Ajuste para o campo de ID do evento
            option.textContent = evento.nome_evento; // Ajuste para o campo de nome do evento
            arrEventos.push(option.textContent);
            novaEstrategia.associar_estrategia.appendChild(option);
        });
    }


    // Evento de submissão do formulário
novaEstrategia.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo_estrategia = novaEstrategia.titulo_estrategia.value;
    const tipo_estrategia = novaEstrategia.tipo_estrategia.value;
    const descricao_estrategia = novaEstrategia.descricao_estrategia.value;
    const organizacao_id = JSON.parse(localStorage.getItem("organizacao")).ID;
    const evento_escolhido = novaEstrategia.associar_estrategia.value;
    console.log(evento_escolhido)
    try {
        // Passo 1: Cadastrar a estratégia
        const response = await axios.post('/api/estrategias/insert', {
            titulo_estrategia,
            tipo_estrategia,
            descricao_estrategia,
            organizacao_id
        });

        alert(response.data);

        // Passo 2: Associar estratégia ao evento selecionado
        const estrategiaId = response.data.id; // Supondo que o ID da estratégia é retornado após o cadastro
        if (estrategiaId && evento_escolhido) {
            await axios.post('/api/estrategias/associate', {
                id_evento: evento_escolhido,
                id_estrategia: estrategiaId
            });
            alert('Estratégia associada ao evento com sucesso!');
        }
    } catch (error) {
        console.log(error.response.data);
    }
});

});



