import Eventos from '../entity/Evento.js';
import conection from '../database/db.js';


class EventoRepository{
    async create(evento){
        try{
            const [results] = await conection.query('INSERT INTO Eventos (nome_evento, localizacao_evento, descricao_evento, data_evento, organizacao_id) VALUES(?,?,?,?,?)',
            [evento.nome_evento, evento.localizacao_evento, evento.descricao_evento, evento.data_evento, evento.organizacao_id]);
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

    async read(id_evento){
        try{
            const [results] = await conection.query('SELECT * FROM Eventos WHERE ID = ? ',[id_evento]);
        
            const evento = results[0];
            if(!evento){
                return null;
            }else{
                return new Eventos(evento.nome_evento, evento.localizacao_evento, evento.descricao_evento, evento.data_evento, evento.organizacao_id, evento.ID);
            }
        }catch(error){
            console.log(`Error : ${error.message}`);
        }
    }

    async update(id_evento, evento){
        try{
            const [results] = await conection.query('UPDATE Eventos SET nome_evento = ? , localizacao_evento = ? , descricao_evento = ? , data_evento = ? , organizacao_id = ?   WHERE ID = ?',
            [evento.nome_evento, evento.localizacao_evento, evento.descricao_evento, evento.data_evento, evento.organizacao_id,  id_evento]);

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