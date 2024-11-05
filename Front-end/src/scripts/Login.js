import { getDOM, getDomAll } from "./getDOM.js";
const login = {
    form:getDOM('#formLogin'),
    cnpj:getDOM('#log_cnpj'),
    password:getDOM('#log_password'),
    log_btn:getDOM("#log_btn")

}

login.form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const cnpj = login.cnpj.value;
    const password = login.password.value;
    try{
        const response = await axios.post('/api/organizacoes/authOrg',{cnpj,password});
        alert(response.data.message);
        
        const organizacao = response.data.organizacao;
        //Armazenando organização no localStorage
        localStorage.setItem('organizacao', JSON.stringify(organizacao));

        window.location.href ="/painel";
        
    }catch(error){
        if(error.status === 404 || error.status === 422){
            alert(error.response.data.error);
        }
    }

})