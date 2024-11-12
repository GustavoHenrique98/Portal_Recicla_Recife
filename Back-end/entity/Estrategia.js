class Estrategias{
    ID;
    titulo_estrategia;
    tipo_estrategia;
    descricao_estrategia;
    efetividade_estrategia;
    organizacao_id;
    constructor(titulo_estrategia,tipo_estrategia,descricao_estrategia,organizacao_id,ID = null){
        this.ID = ID;
        this.titulo_estrategia = titulo_estrategia;
        this.tipo_estrategia = tipo_estrategia;
        this.descricao_estrategia = descricao_estrategia;
        this.organizacao_id = organizacao_id
    }
}


export default Estrategias;