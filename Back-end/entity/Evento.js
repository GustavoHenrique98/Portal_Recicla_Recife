class Eventos{
    constructor(nome_evento, localizacao_evento, descricao_evento , data_inicio_evento, data_final_evento, organizacao_id, estrategia_id = null, ID = null){
        this.ID = ID;
        this.nome_evento = nome_evento;
        this.localizacao_evento = localizacao_evento;
        this.descricao_evento = descricao_evento;
        this.data_criacao_evento = new Date();
        this.data_inicio_evento = data_inicio_evento;
        this.data_final_evento = data_final_evento;
        this.organizacao_id = organizacao_id;
        this.estrategia_id = estrategia_id;
    }

}   

export default Eventos;