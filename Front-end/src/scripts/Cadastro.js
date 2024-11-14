import { getDOM, getDomAll } from "./getDOM.js";

const cadastro  ={
    form:getDOM("#formCadastro"),
    reg_cnpj:getDOM('#reg_cnpj'),
    reg_nomeFantasia:getDOM("#reg_nomeFantasia"),
    reg_email:getDOM("#reg_email"),
    reg_password:getDOM("#reg_password"),
    reg_porte:getDOM("#reg_porte"),
    reg_telefone:getDOM("#reg_telefone"),
    reg_localizacao:getDOM("#reg_localizacao"),
    reg_responsavel:getDOM("#reg_responsavel")
}

cadastro.form.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const cnpj = cadastro.reg_cnpj.value;
    const nome_fantasia = cadastro.reg_nomeFantasia.value;
    const email = cadastro.reg_email.value;
    const password = cadastro.reg_password.value;
    const porte = cadastro.reg_porte.value;
    const telefone = cadastro.reg_telefone.value;
    const localizacao_organizacao = cadastro.reg_localizacao.value;
    const responsavel_organizacao = cadastro.reg_responsavel.value;

    try{
        const response = await axios.post('/api/organizacoes/insert',{
            cnpj,
            nome_fantasia,
            email,
            password,
            porte,
            telefone,
            localizacao_organizacao,
            responsavel_organizacao
        })
        
        alert(response.data);
        window.location.href ="/"
    }catch(error){
        alert(error.response.data);
    }
});
