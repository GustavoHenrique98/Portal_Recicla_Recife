class Estrategias{
    ID;
    titulo_estrategia;
    tipo_estrategia;
    descricao_estrategia;
    efetividade_estrategia;
    constructor(titulo_estrategia,tipo_estrategia,descricao_estrategia,efetividade_estrategia,ID = null){
        this.ID = ID;
        this.titulo_estrategia = titulo_estrategia;
        this.tipo_estrategia = tipo_estrategia;
        this.descricao_estrategia = descricao_estrategia;
        this.efetividade_estrategia = efetividade_estrategia;
    }
}


export default Estrategias;