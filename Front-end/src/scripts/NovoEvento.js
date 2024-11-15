import {getDOM} from "./getDOM.js";
const evento = {
    form:getDOM("#formEvento"),
    nome_evento:getDOM("#nome_evento"),
    localizacao_evento:getDOM('#localizacao_evento'),
    data_inicio_evento:getDOM("#data_inicio_evento"),
    data_final_evento:getDOM("#data_final_evento"),
    descricao_evento:getDOM("#descricao_evento")
}


evento.form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const nome_evento = evento.nome_evento.value
    const localizacao_evento = evento.localizacao_evento.value;
    const data_inicio_evento = evento.data_inicio_evento.value;
    const data_final_evento = evento.data_final_evento.value;
    const descricao_evento = evento.descricao_evento.value;
    const estrategia_id = null;
    const organizacao_id = JSON.parse(localStorage.getItem("organizacao")).ID;
    try{
        const response = await axios.post('/api/eventos/insert',{
            nome_evento,
            localizacao_evento,
            descricao_evento,
            data_inicio_evento,
            data_final_evento,
            organizacao_id,
            estrategia_id
        });
        alert(response.data.message);
        window.location.href="/painel/novo-evento";
        
        evento.form.reset();
    }catch(error){
        console.error(error.response.message);
    }
})