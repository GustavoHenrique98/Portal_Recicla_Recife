import { getDOM, getDomAll } from "./getDOM.js";

const meusEventos = {
    secao_container: getDOM('#container_box_estrategias'),
    titulo: getDOM("#secao_minhas_estrategias h2")
};

window.addEventListener('load', async () => {
    try {
        const organizacao_id = JSON.parse(localStorage.getItem("organizacao")).ID;
        const response = await axios.get(`/api/estrategias/list/estrategies-from-orgs/${organizacao_id}`);

        if (response.data.length > 0) {
            meusEventos.secao_container.innerHTML = '';
            meusEventos.titulo.remove();

            response.data.forEach((estrategia) => {
                const boxEvento = document.createElement('div');
                boxEvento.classList.add('box_evento');

                // Utilizando innerHTML para criar a estrutura da tabela
                boxEvento.innerHTML = `
                    <table class="eventosTable">
                        <thead>
                            <tr>
                                <th class="info_evento">${estrategia.titulo_estrategia}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="info_evento">Tipo : ${estrategia.tipo_estrategia}</td>
                            </tr>
                            <tr>
                                <td class="info_evento">Descrição: ${estrategia.descricao_estrategia}</td>
                            </tr>
                            
                            
                        </tbody>
                    </table>
                `;

                meusEventos.secao_container.appendChild(boxEvento);

                // Adiciona evento de clique no boxEvento para abrir o modal
                boxEvento.addEventListener('click', () => {
                    criarModal(estrategia);
                });
            });
        }
    } catch (error) {
        console.log(error);
    }
});

// Função para criar o modal e adicionar ao body.
function criarModal(estrategia) {
   

    const modal = document.createElement('dialog');
    modal.id = 'modal';

    modal.innerHTML = `
        <header>
            <h2>Detalhes da estratégia </h2>
            <div id="modal_actions">
                <button class="btn_acoes_modal" id="editEstrategiaBtn"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="btn_acoes_modal" id="deleteEstrategiaBtn"><i class="fa-solid fa-trash-can"></i></button>
                <button class="btn_acoes_modal" id="closeModalBtn"><i class="fa-solid fa-xmark"></i></button>
            </div>
        </header>
        <form action="#" method="#" id="modal_estrategia">
            <fieldset>
                <div class="box_modal_inputs">
                    <label for="modal_titulo_estrategia">Titulo:</label>
                    <input type="text" id="modal_titulo_estrategia"  class="inputs" value="${estrategia.titulo_estrategia}" disabled>
                </div>
                <div id="container_box_modal_inputs">
                    <div class="box_modal_inputs">
                        <label for="modal_tipo_estrategia">Tipo:</label>
                        <input type="text" id="modal_tipo_estrategia"  class="inputs" value="${estrategia.tipo_estrategia}" disabled>
                    </div>
                </div>
                
                <div id="container_desc_estrategia">
                    <label for="modal_descricao_evento">Descrição:</label>
                    <textarea id="modal_descricao_evento" disabled  class="inputs">${estrategia.descricao_estrategia}</textarea>
                </div>

                <button type="submit" id="btn_updateEstrategia" class="inputs">Atualizar</button>
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

    //Atualizar Estrategias
    const formulario = getDOM('#modal_estrategia'); 
    const editEstrategiaBtn = getDOM("#editEstrategiaBtn");
    const btn_updateEstrategia = getDOM("#btn_updateEstrategia");
    const tituloModal = getDOM('h2');
    const inputs = getDomAll('.inputs');

    editEstrategiaBtn.addEventListener('click',()=>{
        inputs.forEach((inputs,i)=>{
            inputs.disabled = false;
            tituloModal.textContent = "Atualizar Estratégia"
            btn_updateEstrategia.style.display="block";
        });
    });

    formulario.addEventListener('submit',async(e)=>{
        e.preventDefault();
        try{
            const titulo_estrategia = inputs[0].value;
            const tipo_estrategia = inputs[1].value;
            const descricao_estrategia = inputs[2].value
            const organizacao_id = JSON.parse(localStorage.getItem("organizacao")).ID;
            
            const response = await axios.put(`/api/estrategias/update/${estrategia.ID}`,{
                titulo_estrategia,
                tipo_estrategia,
                descricao_estrategia,
                organizacao_id,
            });

            if(response.status===200){
                alert(response.data);
                window.location.href="/painel/minhas-estrategias";
            }
        }catch(error){
            console.log(error.response.data);
        }
    })
    

    const deleteEstrategiaBtn = getDOM("#deleteEstrategiaBtn");

    // Deletar estratégias.
    deleteEstrategiaBtn.addEventListener('click',async()=>{
        try{
            const response = await axios.delete(`/api/estrategias/delete/${estrategia.ID}`);
            alert(response.data)
            window.location.href="/painel/minhas-estrategias";
            
        }catch(error){
            console.log(error.response);
        }
    })


   


}
