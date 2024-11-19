import { getDOM, getDomAll } from "./getDOM.js";




window.addEventListener('load', async()=>{
    const secaoEventos = {
        container_eventos :getDOM("#container_eventos"),
        titulo_eventos:getDomAll(".titulo_eventos"),
        descricao_evento:getDomAll('.descricao_evento'),
        btn_detalhese_evento:getDomAll('.btn_detalhes_evento')
    }

    try{
        const responseAllEvOrgs  = await axios.get('/api/eventos/all-events-from-orgs');
        console.log(responseAllEvOrgs)
       
        responseAllEvOrgs.data.forEach((dados,i) => {
            const box_evento = document.createElement('article');
            
            box_evento.classList.add('box_eventos');
            box_evento.innerHTML = `
                 <header>
                    <h3 class="titulo_eventos">${dados.nome_evento}</h3>
                </header>
    
                <p class="descricao_evento">${dados.descricao_evento}</p>
                
                
                <button class="btn_detalhes_evento">Saiba mais</button>        
            `;
            secaoEventos.container_eventos.appendChild(box_evento);   
            const btn_detalhes_evento = getDomAll(".btn_detalhes_evento");
            const modal = getDOM('#modal_eventos');
            const btnFecharModal = getDOM('#btn_closeModalEvt');
            const infoDados = getDomAll('.info_dados');
            
            btn_detalhes_evento[i].addEventListener('click', ()=>{
                modal.style.display = "flex"
                // secaoEventos.container_eventos.style.overflowY="hidden";
                infoDados[0].textContent = dados.nome_evento;
                infoDados[1].textContent = dados.data_criacao_evento;
                infoDados[2].textContent = dados.data_inicio_evento;
                infoDados[3].textContent = dados.data_final_evento;
                infoDados[4].textContent = dados.descricao_evento;
                infoDados[5].textContent = dados.localizacao_evento;
                infoDados[6].textContent = dados.nome_fantasia;
                infoDados[7].textContent = dados.cnpj;
                infoDados[8].textContent = dados.email;
                infoDados[9].textContent = dados.telefone;
                infoDados[10].textContent = dados.porte;
                infoDados[11].textContent = dados.responsavel_organizacao;
                infoDados[12].textContent = dados.localizacao_organizacao;

                
            });

            btnFecharModal.addEventListener('click',()=>{
                modal.style.display ="none"
                secaoEventos.container_eventos.style.overflowY="auto";
            });

        });
        
        
       
       
        
        
    }catch(error){
        console.log(error);
    }

});


