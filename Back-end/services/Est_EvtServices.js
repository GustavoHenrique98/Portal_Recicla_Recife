import est_evtRepository from "../repository/Est_evtRepository.js";
import Estrategias_eventos from "../entity/Estrategias_eventos.js";

class est_evtService{
    constructor(){
        this.est_evtRepository = new est_evtRepository();
    }


    async associateEst_evt(ID_evento,ID_estrategia){
        if(!ID_estrategia || !ID_evento){
            console.log("ID da estratégia ou evento não fornecido!");
        }else{
            try{
                const novaAssociacao = new Estrategias_eventos(ID_evento,ID_estrategia);
                await this.est_evtRepository.create(novaAssociacao);

            }catch(error){
                console.log(`Error : ${error.message}`);
            }
        }
    }
}


export default est_evtService;