import Eventos from '../entity/Evento.js';
import conection from '../database/db.js';


class EventoRepository{
    async create(evento){
        try{
            const [results] = await conection.query('INSERT INTO Eventos (nome_evento, localizacao_evento, descricao_evento, data_criacao_evento,data_inicio_evento , data_final_evento, organizacao_id , estrategia_id) VALUES(?,?,?,NOW(),?,?,?,?)',
            [evento.nome_evento, evento.localizacao_evento, evento.descricao_evento, evento.data_inicio_evento , evento.data_final_evento, evento.organizacao_id,evento.estrategia_id ]);
        }catch(error){
            console.log(`Error : ${error.message}`);
        }
    }

    async list(){
        try{
            const [results] = await conection.query('SELECT * FROM Eventos');
        
            if(results.length === 0){
                return null;
            }

            return results;

        }catch(error){
            console.log(`Error : ${error.message}`);
        }
    }
    
    async listEventsFromOrgs(organizacao_id) {
        try {
            const [results] = await conection.query(
                `SELECT ID, nome_evento, localizacao_evento, descricao_evento, 
                        DATE_FORMAT(data_criacao_evento, '%d/%m/%Y') AS data_criacao_evento,
                        DATE_FORMAT(data_inicio_evento, '%d/%m/%Y')AS data_inicio_evento,
                        DATE_FORMAT(data_final_evento, '%d/%m/%Y') AS data_final_evento ,
                        estrategia_id , organizacao_id 
                 FROM Eventos 
                 WHERE organizacao_id = ?`, 
                [organizacao_id]
            );
    
            if (results.length === 0) {
                return null;
            }
    
            return results;
    
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    async read(id_evento){
        try{
            const [results] = await conection.query('SELECT * FROM Eventos WHERE ID = ? ',[id_evento]);
        
            const evento = results[0];
            if(!evento){
                return null;
            }else{
                return new Eventos(evento.nome_evento, evento.localizacao_evento, evento.descricao_evento, evento.data_criacao_evento, evento.data_inicio_evento , evento.data_final_evento, evento.organizacao_id,evento.estrategia_id, evento.ID);
            }
        }catch(error){
            console.log(`Error : ${error.message}`);
        }
    }

    async update(id_evento, evento){
        try{
            const [results] = await conection.query('UPDATE Eventos SET nome_evento = ? , localizacao_evento = ? , descricao_evento = ? , data_inicio_evento = ? , data_final_evento = ?    WHERE ID = ?',
            [evento.nome_evento, evento.localizacao_evento, evento.descricao_evento,  evento.data_inicio_evento , evento.data_final_evento , id_evento]);

            if(results.affectedRows === 0){
                return null;
            }
            
        }catch(error){
            console.log(`Error : ${error.message}`);
        }
    }


    async delete(id_evento){
        try{
            const [results] = await conection.query('DELETE FROM Eventos WHERE ID = ?' ,[id_evento]);
            if(results.affectedRows === 0){
                return null;
            }
        }catch(error){
            console.log(`Error : ${error.message}`);
        }
    }

}








export default EventoRepository;