class Eventos{
    constructor(nome_evento,localizacao_evento,descricao_evento,data_evento,organizacao_id,ID = null){
        this.ID = ID;
        this.nome_evento = nome_evento;
        this.localizacao_evento = localizacao_evento;
        this.descricao_evento = descricao_evento;
        this.data_evento = data_evento;
        this.organizacao_id= organizacao_id;
    }

}   

export default Eventos;