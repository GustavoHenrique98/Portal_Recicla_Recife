import Estrategias from'../entity/Estrategia.js';
import EstrategiaRepository from '../repository/EstrategiaRepository.js';

class EstrategiaService{
    EstrategiaRepository;
    constructor(){
        this.EstrategiaRepository = new EstrategiaRepository();
    }


    async createEstrategia(titulo_estrategia, tipo_estrategia, descricao_estrategia, organizacao_id){
        if(!titulo_estrategia || !tipo_estrategia || !descricao_estrategia || !organizacao_id){
            console.log(`Erro , preencha todos os campos!`);
        }else{
            try{
                const novaEstrategia = new Estrategias(titulo_estrategia, tipo_estrategia, descricao_estrategia, organizacao_id);
                await this.EstrategiaRepository.create(novaEstrategia);
            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }

    async listEstrategias(){
        try{
            const results = await this.EstrategiaRepository.list();
            return results;
        }catch(error){
            console.log(`Erro : ${error.message}`);
        }
    }

    async listOrgEstrategies(organizacao_id){
        if(!organizacao_id){
            console.log(`Erro : Id da organização não fornecido!`);
        }else{
            try{
                const results = await this.EstrategiaRepository.listEstrategiesFromOrgs(organizacao_id);
                return results;
            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }


    async readEstrategia(id_estrategia){
        if(!id_estrategia){
            console.log("Erro : Id da estratégia não fornecido! ");
        }else{
            try{
                const results = await this.EstrategiaRepository.read(id_estrategia);
                return results;
            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }

    async updateEstrategia(id_estrategia,estrategia){
        if(!id_estrategia || !estrategia){
            console.log("Erro : id da estrategia ou estrategia não fornecido!" );
        }else{
            try{
                const results = await this.EstrategiaRepository.update(id_estrategia,estrategia);
                return results;
            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }

    async deleteEstrategia(id_estrategia){
        if(!id_estrategia){
            console.log("Erro : id da estrategia não fornecido!" );
        }else{
            try{
                const results = await this.EstrategiaRepository.delete(id_estrategia);
                return results;

            }catch(error){
                console.log(`Erro : ${error.message}`);
            }
        }
    }
}




export default EstrategiaService;