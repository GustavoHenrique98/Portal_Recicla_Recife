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
                                <h2 id="titulo_evento" class="info_dados">${dados.nome_evento}</h2>
                            </header>
                            
                            <table>
                                <thead>
                                    <tr>
                                        <th id="header_tabela" colspan="2">
                                            Publicado em :<span class="info_dados"> ${dados.data_criacao_evento}</span>
                                         </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>Data de inicio:<span class="info_dados"> ${dados.data_inicio_evento}</span> </td>
                                        <td>Data de encerramento:<span class="info_dados"> ${dados.data_final_evento}</span> </td>
                                    </tr>

                                    <tr>
                                        <td colspan="2">Descrição: <span class="info_dados" id="descricao_evento_modal">${dados.descricao_evento}</span></td>
                                    </tr>

                                    <tr>
                                        <td  colspan="2">Localização do evento:<span class="info_dados"> ${dados.localizacao_evento}</span> </td>
                                    </tr>
                                   
                                    
                                    <tr>
                                        <td>
                                            Organização:<span class="info_dados"> ${dados.nome_fantasia}</span>
                                        </td>
                                        <td>
                                            Cnpj:<span class="info_dados"> ${dados.cnpj}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            E-mail:<span class="info_dados"> ${dados.email}</span>
                                        </td>
                                        <td>
                                            Telefone:<span class="info_dados"> ${dados.telefone}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        
                                        <td>
                                            Porte :<span class="info_dados"> ${dados.porte}</span>
                                        </td>
                                        <td>
                                            Responsável :<span class="info_dados"> ${dados.responsavel_organizacao}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                       
                                        <td colspan="2">
                                            Endereço :<span class="info_dados"> ${dados.localizacao_organizacao}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Estratégia :<span class="info_dados"> </span>
                                        </td>
                                        <td>
                                            Tipo :<span class="info_dados"> </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        
                                        <td colspan="2">
                                            Descrição da estratégia :<span class="info_dados"></span>
                                        </td>
                                    </tr>


                                </tbody>
                            </table>      
            `;
            secaoEventos.container_eventos.appendChild(box_evento);   
           
        });
        
        
       
       
        
        
    }catch(error){
        console.log(error);
    }

});


