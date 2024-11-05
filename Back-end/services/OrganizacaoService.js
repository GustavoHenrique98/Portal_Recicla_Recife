import Organizacoes from'../entity/Organizacao.js';
import OrganizacaoRepository from '../repository/OrganizacaoRepository.js';

class OrganizacaoService{
    OrganizacaoRepository;
    constructor(){
        this.OrganizacaoRepository = new OrganizacaoRepository();
    }


    async createOrganizacao(cnpj, nome_fantasia, email, password, porte, telefone, localizacao_organizacao, responsavel_organizacao){
        if(!cnpj || !nome_fantasia || !email || !password ||!porte || !telefone || !localizacao_organizacao ||!responsavel_organizacao){
            console.log(`Erro , preencha todos os campos!`);
        }else{
            try{
                const novaOrganizacao = new Organizacoes(cnpj, nome_fantasia, email, password, porte, telefone, localizacao_organizacao, responsavel_organizacao);
                await this.OrganizacaoRepository.create(novaOrganizacao);
            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }

    async listOrganizacoes(){
        try{
            const results = await this.OrganizacaoRepository.list();
            return results;
        }catch(error){
            console.log(`Erro : ${error.message}`);
        }
    }

    async readOrganizacao(id_organizacao){
        if(!id_organizacao){
            console.log("Erro : Id da organização não fornecido! ");
        }else{
            try{
                const results = await this.OrganizacaoRepository.read(id_organizacao);
                return results;
            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }

    async updateOrganizacao(id_organizacao,organizacao){
        if(!id_organizacao || !organizacao){
            console.log("Erro : id da organização ou organização não fornecido!" );
        }else{
            try{
                const results = await this.OrganizacaoRepository.update(id_organizacao,organizacao);

            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }

    async deleteOrganizacao(id_organizacao){
        if(!id_organizacao){
            console.log("Erro : id da organização não fornecido!" );
        }else{
            try{
                const results = await this.OrganizacaoRepository.delete(id_organizacao);
                return results;

            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }
}




export default OrganizacaoService;