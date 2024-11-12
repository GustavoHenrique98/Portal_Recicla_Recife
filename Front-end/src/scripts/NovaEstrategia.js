import {getDOM , getDomAll} from './getDOM.js';

const novaEstrategia = {
    form:getDOM('#formEstrategias'),
    titulo_estrategia:getDOM('#titulo_estrategia'),
    tipo_estrategia:getDOM('#tipo_estrategia'),
    descricao_estrategia: getDOM('#descricao_estrategia')
}

novaEstrategia.form.addEventListener('submit', async(e)=>{
    e.preventDefault();

    const titulo_estrategia = novaEstrategia.titulo_estrategia.value;
    const tipo_estrategia = novaEstrategia.tipo_estrategia.value;
    const descricao_estrategia = novaEstrategia.descricao_estrategia.value;
    const organizacao_id = JSON.parse(localStorage.getItem("organizacao")).ID;
    try{
        const response = await axios.post('/api/estrategias/insert',{
            titulo_estrategia,
            tipo_estrategia,
            descricao_estrategia,
            organizacao_id
            
        })
        alert(response.data)
    }catch(error){
        console.log(error.response.data);
    }
})