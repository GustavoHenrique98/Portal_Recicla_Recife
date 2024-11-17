import { getDOM, getDomAll } from "./getDOM.js";

const meusEventos = {
    secao_container: getDOM('#container_box_eventos'),
    titulo: getDOM("#secao_meus_eventos h2")
};

window.addEventListener('load', async () => {
    try {
        const organizacao_id = JSON.parse(localStorage.getItem("organizacao")).ID;
        const response = await axios.get(`/api/eventos/events-from-org/${organizacao_id}`);
        if (response.data.length > 0) {
            meusEventos.secao_container.innerHTML = '';
            meusEventos.titulo.remove();
            
            response.data.forEach((evento) => {
                const boxEvento = document.createElement('div');
                boxEvento.classList.add('box_evento');
                
                // Utilizando innerHTML para criar a estrutura da tabela
                boxEvento.innerHTML = `
                    <table class="eventosTable">
                        <thead>
                            <tr>
                                <th class="info_evento">${evento.nome_evento}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="info_evento">Localização: ${evento.localizacao_evento}</td>
                            </tr>
                            <tr>
                                <td class="info_evento">Descrição: ${evento.descricao_evento}</td>
                            </tr>
                            

                            <tr>
                                <td class="info_evento">Data de início: ${evento.data_inicio_evento}</td>
                                </tr>

                                <tr>
                                <td class="info_evento">Data de encerramento: ${evento.data_final_evento}</td>
                                </tr>
                            

                        </tbody>
                    </table>
                    `;
                meusEventos.secao_container.appendChild(boxEvento);
                    
                // Adiciona evento de clique no boxEvento para abrir o modal
                boxEvento.addEventListener('click', async() => {
                   
                    try{
                        const responseEstrategias = await axios.get(`/api/estrategias/list/estrategies-from-events/${evento.estrategia_id}`);
                        const estrategia = responseEstrategias.data;
                        console.log(responseEstrategias.status);
                        criarModal(evento,estrategia[0]);

                    }catch(error){
                       const estrategia = (error.status);
                       criarModal(evento,estrategia);
                    }
                });
                
            });
        }

    } catch (error) {
        console.log(error);
    }
});

// Função para criar o modal e adicionar ao body.
function criarModal(evento,estrategia) {
    function formatarData(data) {
        const [dia, mes, ano] = data.split('/');
        return `${ano}-${mes}-${dia}`;
    }
    const dataInicioEvento = formatarData(evento.data_inicio_evento);
    const dataFinalEvento = formatarData(evento.data_final_evento);
    //Criando modal
    const modal = document.createElement('dialog');
    modal.id = 'modal';

    //Verificando se o evento já possui uma estratégia para alterar o conteúdo vindo do back-end
    if(Object.keys(estrategia).length >0){
        modal.innerHTML = `
        <header>
            <h2>Detalhes do evento </h2>
            <div id="modal_actions">
                <button class="btn_acoes_modal" id="updateEventoBtn"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="btn_acoes_modal" id="deleteEventoBtn"><i class="fa-solid fa-trash-can"></i></button>
                <button class="btn_acoes_modal" id="closeModalBtn"><i class="fa-solid fa-xmark"></i></button>
            </div>
        </header>
        <form action="#" method="#" id="modal_eventos">
            <fieldset>
                <div class="box_modal_inputs">
                    <label for="modal_nome_evento">Nome do Evento:</label>
                    <input type="text" id="modal_nome_evento"  class="inputs" value="${evento.nome_evento}" disabled>
                </div>

                <div class="box_modal_inputs">
                        <label for="modal_localizacao_evento">Localização do Evento:</label>
                        <input type="text" id="modal_localizacao_evento"  class="inputs" value="${evento.localizacao_evento}" disabled>
                </div>

                <div class="container_box_modal_inputs">
                  
                  <div class="box_modal_inputs">
                        <label for="modal_data_evento">Data de inicio:</label>
                        <input type="date" id="modal_data_evento"  class="inputs" value="${dataInicioEvento}" disabled>
                  </div>

                   <div class="box_modal_inputs">
                       <label for="modal_data_evento">Data de encerramento:</label>
                       <input type="date" id="modal_data_evento"  class="inputs" value="${dataFinalEvento}" disabled>
                   </div>

                </div>
                   
                
                <div id="container_desc_evento">
                    <label for="modal_descricao_evento">Descrição do evento:</label>
                    <textarea id="modal_descricao_evento" disabled  class="inputs">${evento.descricao_evento}</textarea>
                    
                </div>


                <div class="container_box_modal_inputs">
                  
                  <div class="box_modal_inputs">
                        <label for="modal_data_evento">Estratégia utilizada:</label>
                        <input type="text" id="modal_titulo_estrategia"  class="inputs" value="${estrategia.titulo_estrategia}" disabled>
                  </div>

                   <div class="box_modal_inputs">
                       <label for="modal_data_evento">Tipo:</label>
                       <input type="text" id="modal_tipo_estrategia"  class="inputs" value="${estrategia.tipo_estrategia}" disabled>
                   </div>

                </div>

                <div id="container_desc_evento">
                    <label for="modal_descricao_evento">Descrição da estratégia:</label>
                    <textarea id="modal_descricao_estrategia" disabled  class="inputs">${estrategia.descricao_estrategia}</textarea>
                    
                </div>
                

                <button type="submit" id="btn_updateEvento" class="inputs">Atualizar</button>
            </fieldset>
        </form>
        `;
        document.body.appendChild(modal);
        modal.showModal();
    
            //Fechar o modal
        const closeModalBtn = document.getElementById('closeModalBtn');
        closeModalBtn.addEventListener('click', () => {
            modal.close();
            document.body.removeChild(modal);
        });

        //Atualizar eventos
        const formulario = getDOM('#modal_eventos')
        const updateEventoBtn = getDOM('#updateEventoBtn');
        const btnUpdate = getDOM('#btn_updateEvento');
        const deleteEventoBtn = getDOM('#deleteEventoBtn');
        const tituloModal = getDOM('h2');
        const inputs = getDomAll('.inputs');


        updateEventoBtn.addEventListener('click',()=>{
            
            
            inputs.forEach((inputs,i)=>{
                inputs.disabled = false;
                tituloModal.textContent = "Atualizar evento"
                btnUpdate.style.display="block";
            });
        });

        formulario.addEventListener('submit',async(e)=>{
            e.preventDefault();
            try{
            const nome_evento = inputs[0].value;
            const localizacao_evento = inputs[1].value;
            const data_inicio_evento = inputs[2].value;
            const data_final_evento = inputs[3].value;
            const descricao_evento = inputs[4].value;

            const response = await axios.put(`/api/eventos/update/${evento.ID}`,{
                nome_evento,
                localizacao_evento,
                descricao_evento,
                data_inicio_evento,
                data_final_evento,
            });

            alert(response.data.message);
            // window.location.href="/painel";

            }catch(error){
                console.log(error.response.data.message);
            }

            try{
                const titulo_estrategia = inputs[5].value
                const tipo_estrategia = inputs[6].value
                const descricao_estrategia = inputs[7].value
                
                console.log(estrategia)
                const updateEstrategias = await axios.put(`api/estrategias/update/${estrategia.ID}`,{
                    titulo_estrategia,
                    tipo_estrategia,
                    descricao_estrategia
                });

                console.log(updateEstrategias.data)
            }catch(error){
                console.log(error.response);
            }
        })
    
        deleteEventoBtn.addEventListener('click',async()=>{
            try{
                const response = await axios.delete(`/api/eventos/delete/${evento.ID}`);
                alert(response.data.message);
                window.location.href="/painel";
                
            }catch(error){
                console.log(error.response.message);
            }
        })
    
    
    
    
    }


    if(estrategia === 404){

        modal.innerHTML = `
        <header>
            <h2>Detalhes do evento </h2>
            <div id="modal_actions">
                <button class="btn_acoes_modal" id="updateEventoBtn"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="btn_acoes_modal" id="deleteEventoBtn"><i class="fa-solid fa-trash-can"></i></button>
                <button class="btn_acoes_modal" id="closeModalBtn"><i class="fa-solid fa-xmark"></i></button>
            </div>
        </header>
        <form action="#" method="#" id="modal_eventos">
            <fieldset>
                <div class="box_modal_inputs">
                    <label for="modal_nome_evento">Nome do Evento:</label>
                    <input type="text" id="modal_nome_evento"  class="inputs" value="${evento.nome_evento}" disabled>
                </div>

                <div class="box_modal_inputs">
                        <label for="modal_localizacao_evento">Localização do Evento:</label>
                        <input type="text" id="modal_localizacao_evento"  class="inputs" value="${evento.localizacao_evento}" disabled>
                </div>

                <div class="container_box_modal_inputs">
                  
                  <div class="box_modal_inputs">
                        <label for="modal_data_evento">Data de inicio:</label>
                        <input type="date" id="modal_data_evento"  class="inputs" value="${dataInicioEvento}" disabled>
                  </div>

                   <div class="box_modal_inputs">
                       <label for="modal_data_evento">Data de encerramento:</label>
                       <input type="date" id="modal_data_evento"  class="inputs" value="${dataFinalEvento}" disabled>
                   </div>

                </div>
                   
                
                <div id="container_desc_evento">
                    <label for="modal_descricao_evento">Descrição do evento:</label>
                    <textarea id="modal_descricao_evento" disabled  class="inputs">${evento.descricao_evento}</textarea>
                    
                </div>


                <div class="container_box_modal_inputs">
                  
                  <div class="box_modal_inputs">
                        <label for="modal_data_evento">Estratégia utilizada:</label>
                        <input type="text" id="modal_titulo_estrategia"  class="inputs" value="" disabled>
                  </div>

                   <div class="box_modal_inputs">
                       <label for="modal_data_evento">Tipo:</label>
                       <input type="text" id="modal_tipo_estrategia"  class="inputs" value="" disabled>
                   </div>

                </div>

                <div id="container_desc_evento">
                    <label for="modal_descricao_evento">Descrição da estratégia:</label>
                    <textarea id="modal_descricao_estrategia" disabled  class="inputs"></textarea>
                    
                </div>
                

                <button type="submit" id="btn_updateEvento" class="inputs">Atualizar</button>
            </fieldset>
        </form>
        `;

        document.body.appendChild(modal);
        modal.showModal();
    
            //Fechar o modal
        const closeModalBtn = document.getElementById('closeModalBtn');
        closeModalBtn.addEventListener('click', () => {
            modal.close();
            document.body.removeChild(modal);
        });

        //Atualizar eventos
        const formulario = getDOM('#modal_eventos')
        const updateEventoBtn = getDOM('#updateEventoBtn');
        const btnUpdate = getDOM('#btn_updateEvento');
        const deleteEventoBtn = getDOM('#deleteEventoBtn');
        const tituloModal = getDOM('h2');
        const inputs = getDomAll('.inputs');


        updateEventoBtn.addEventListener('click',()=>{
            for(let i = 0 ; i <5 ;i++){
                inputs[i].disabled = false;
                tituloModal.textContent = "Atualizar evento"
                btnUpdate.style.display="block";
            }
            
        });

        formulario.addEventListener('submit',async(e)=>{
            e.preventDefault();
            try{
            const nome_evento = inputs[0].value;
            const localizacao_evento = inputs[1].value;
            const data_inicio_evento = inputs[2].value;
            const data_final_evento = inputs[3].value;
            const descricao_evento = inputs[4].value;

            const response = await axios.put(`/api/eventos/update/${evento.ID}`,{
                nome_evento,
                localizacao_evento,
                descricao_evento,
                data_inicio_evento,
                data_final_evento,
            });

            alert(response.data.message);
            window.location.href="/painel";

            }catch(error){
                console.log(error.response.data.message);
            }
        })
    
        deleteEventoBtn.addEventListener('click',async()=>{
            try{
                const response = await axios.delete(`/api/eventos/delete/${evento.ID}`);
                alert(response.data.message);
                window.location.href="/painel";
                
            }catch(error){
                console.log(error.response.message);
            }
        })
    
    



    }
    
    
    
    
   
}