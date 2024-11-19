import {getDOM , getDomAll} from'./getDOM.js';

const organizacao  ={
    form:getDOM("#formConta"),
    cnpj:getDOM('#cnpj'),
    nomeFantasia:getDOM("#nomeFantasia"),
    email:getDOM("#email"),
    password:getDOM("#password"),
    porte:getDOM("#porte"),
    telefone:getDOM("#telefone"),
    localizacao:getDOM("#localizacao"),
    responsavel:getDOM("#responsavel")
}

const organizacao_id = JSON.parse(localStorage.getItem("organizacao")).ID;

window.addEventListener('load', async()=>{
    const inputs = getDomAll('input');
    try{
        const response = await axios.get(`/api/organizacoes/read/${organizacao_id}`)
        inputs[0].value = response.data.cnpj;
        inputs[1].value = response.data.nome_fantasia;
        inputs[2].value = response.data.email;
        inputs[3].value = response.data.password;
        inputs[4].value = response.data.porte;
        inputs[5].value = response.data.telefone;
        inputs[6].value = response.data.localizacao_organizacao;
        inputs[7].value = response.data.responsavel_organizacao;

    }catch(error){
        console.log(error.response.data);
    }
    
})

//Todos os inputs da área de atualiação de cadastro.
const inputs = getDomAll('input');

//Botão que habilta os inputs.
const btnEditar = getDOM('#btn_atualizarConta');
//Botao que atualiza (para fazer aparecer).
const btnATT = getDOM('#btnAtt');

btnEditar.addEventListener('click', ()=>{
    inputs.forEach(inputs=>{
        inputs.disabled = false;
    });

    btnATT.style.display="block";

});


//selecionando formulário para dar update.
organizacao.form.addEventListener('submit' , async(e)=>{
    e.preventDefault();
    const cnpj = getDOM('#cnpj').value;
    const nome_fantasia = getDOM("#nomeFantasia").value;
    const email = getDOM("#email").value;
    const password = getDOM("#password").value;
    const porte = getDOM("#porte").value;
    const telefone = getDOM("#telefone").value;
    const localizacao_organizacao = getDOM("#localizacao").value;
    const responsavel_organizacao = getDOM("#responsavel").value;
    try{
        const response = await axios.put(`/api/organizacoes/update/${organizacao_id}`,{
            cnpj,
            nome_fantasia,
            email,
            password,
            porte,
            telefone,
            localizacao_organizacao,
            responsavel_organizacao
        });
        alert(response.data.message);


        window.location.href="/painel/config-usuario";
    }catch(error){
        console.log(error.response.data);
    }
});


const btn_deletarConta = getDOM('#btn_deletarConta');

btn_deletarConta.addEventListener('click', async(e)=>{
    e.preventDefault();
    try{
        const response = await axios.delete(`/api/organizacoes/delete/${organizacao_id}`);
        console.log(response.data.message);
        localStorage.removeItem('organizacao');
        window.location.href="/";
    }catch(error){
        console.log(error.response.data);
    }
});