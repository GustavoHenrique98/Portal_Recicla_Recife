import Estrategias_eventos from "../entity/Estrategias_eventos.js";
import conection from '../database/db.js';


class est_evtRepository{
    async create(est_evt){
        
        try{
            const [results] = await conection.query("INSERT INTO Est_Evt (id_evento,id_estrategia) VALUES(?,?)",[est_evt.ID_evento,est_evt.ID_estrategia]);
        }catch(error){
            console.log(`Error : ${error.message}`);
        }
    }
}






export default est_evtRepository;