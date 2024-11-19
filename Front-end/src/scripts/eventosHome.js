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
       
        responseAllEvOrgs.data.forEach(dados => {
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
        });
        
        const btnteste = getDomAll(".btn_detalhes_evento");
        const modal = document.createElement('dialog');
        modal.id = "modal_eventos"
        modal.style.cssText={}
        btnteste.forEach((btns,i)=>{
            btns.addEventListener('click', ()=>{
                
            })
        })
        
        
    }catch(error){

    }

});


