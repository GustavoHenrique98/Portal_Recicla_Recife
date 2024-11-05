class Organizacoes {
    ID;
    cnpj;
    nome_fantasia;
    email;
    password;
    porte;
    telefone;
    localizacao_organizacao;
    responsavel_organizacao;
    constructor(cnpj, nome_fantasia, email, password, porte, telefone, localizacao_organizacao, responsavel_organizacao, ID=null) {
        this.ID = ID;
        this.cnpj = cnpj;
        this.nome_fantasia =nome_fantasia;
        this.email = email,
        this.password = password;
        this.porte = porte;
        this.telefone = telefone;
        this.localizacao_organizacao = localizacao_organizacao;
        this.responsavel_organizacao = responsavel_organizacao;
    }

}

export default Organizacoes;