import {getDOM} from "./getDOM.js";
const evento = {
    form:getDOM("#formEvento"),
    nome_evento:getDOM("#nome_evento"),
    localizacao_evento:getDOM('#localizacao_evento'),
    data_evento:getDOM("#data_evento"),
    descricao_evento:getDOM("#descricao_evento"),
    btn_cadastro_evento:getDOM("#btn_cadastro_evento")
}


evento.form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const nome_evento = evento.nome_evento.value
    const localizacao_evento = evento.localizacao_evento.value;
    const data_evento = evento.data_evento.value;
    const descricao_evento = evento.descricao_evento.value;
    const organizacao_id = JSON.parse(localStorage.getItem("organizacao")).ID;
    try{
        const response = await axios.post('/api/eventos/insert',{
            nome_evento,
            localizacao_evento,
            data_evento,
            descricao_evento,
            organizacao_id
        })
        alert(response.data.message);
        evento.form.reset();
    }catch(error){
        console.error(error.response);
    }
})