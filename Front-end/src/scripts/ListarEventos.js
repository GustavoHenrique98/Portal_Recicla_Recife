import { getDOM, getDomAll } from "./getDOM.js";

const meusEventos = {
    secao_container: getDOM('#container_box_eventos'),
    titulo: getDOM("#secao_meus_eventos h2")
};

window.addEventListener('load', async (e) => {
    try {
        const organizacao_id = JSON.parse(localStorage.getItem("organizacao")).ID;
        const response = await axios.get(`/api/eventos/events-from-org/${organizacao_id}`);
        
        if (response.data.length > 0) {
            // Limpando o conteúdo da seção antes de adicionar novos eventos.
            meusEventos.secao_container.innerHTML = '';
            
            // Removendo a mensagem que indica que não há nenhum evento cadastrado.
            meusEventos.titulo.remove();


            response.data.forEach(evento => {
                // Criação do container de elementos e adicionado a classe box_eventos.
                const boxEvento = document.createElement('div');
                boxEvento.classList.add('box_evento');

                // Criação da tabela
                const tabela = document.createElement('table');
                tabela.classList.add('eventosTable'); // Adiciona a classe eventosTable

                // Cabeçalho da tabela
                const thead = document.createElement('thead');
                const trCabeçalho = document.createElement('tr');
                const th = document.createElement('th');
                th.classList.add('info_evento'); // Adiciona a classe info_evento
                th.textContent = evento.nome_evento; // Define o nome do evento no cabeçalho
                trCabeçalho.appendChild(th);
                thead.appendChild(trCabeçalho);

                // Corpo da tabela (tbody)
                const tbody = document.createElement('tbody');

                // Linha de Localização
                const trLocalizacao = document.createElement('tr');
                const tdLocalizacao = document.createElement('td');
                tdLocalizacao.classList.add('info_evento');
                tdLocalizacao.textContent = `Localização: ${evento.localizacao_evento}`;
                trLocalizacao.appendChild(tdLocalizacao);
                tbody.appendChild(trLocalizacao);

                // Linha de Descrição
                const trDescricao = document.createElement('tr');
                const tdDescricao = document.createElement('td');
                tdDescricao.classList.add('info_evento');
                tdDescricao.textContent = `Descrição: ${evento.descricao_evento}`;
                trDescricao.appendChild(tdDescricao);
                tbody.appendChild(trDescricao);

                // Linha de Data
                const trData = document.createElement('tr');
                const tdData = document.createElement('td');
                tdData.classList.add('info_evento');
                tdData.textContent = `Data: ${evento.data_evento}`; // Aqui assumimos que a data já vem formatada
                trData.appendChild(tdData);
                tbody.appendChild(trData);

                // Adiciona o tbody à tabela
                tabela.appendChild(thead);
                tabela.appendChild(tbody);

                // Adiciona a tabela dentro do box_evento
                boxEvento.appendChild(tabela);

                // Adiciona o box_evento ao container de eventos
                meusEventos.secao_container.appendChild(boxEvento);
            });
            
        }


        const eventos = getDomAll(".box_evento");
        const dados = response.data;

        for(let i =0 ; i<eventos.length;i++){
            eventos[i].addEventListener('click',()=>{
                alert(dados[i].nome_evento);
            });
        }
    } catch (error) {
        console.log(error)
    }
});