import Estrategias from '../entity/Estrategia.js';
import conection from '../database/db.js';


class EstrategiaRepository{
    async create(estrategia){
        try{
            const [results] = await conection.query('INSERT INTO Estrategias (titulo_estrategia, tipo_estrategia, descricao_estrategia, organizacao_id) VALUES(?,?,?,?)',
            [estrategia.titulo_estrategia, estrategia.tipo_estrategia, estrategia.descricao_estrategia, estrategia.organizacao_id]);

        }catch(error){
            console.log(`Repository Error : ${error.message}`);
        }
    }

    async list(){
        try{
            const [results] = await conection.query('SELECT * FROM Estrategias');
        
            if(results.length === 0){
                return null;
            }

            return results;

        }catch(error){
            console.log(`Repository Error : ${error.message}`);
        }
    }

    async listEstrategiesFromOrgs(organizacao_id){
        try{
            const [results] = await conection.query('SELECT * FROM Estrategias WHERE organizacao_id = ?',[organizacao_id]);
        
            if(results.length === 0){
                return null;
            }

            return results;

        }catch(error){
            console.log(`Repository Error : ${error.message}`);
        }
    }

    async listEstrategiesFromEvents(estrategia_id){
        try{
            const [results]  = await conection.query(`SELECT 
            estrategias.*
            FROM  eventos
            INNER JOIN  estrategias
            ON  eventos.estrategia_id = estrategias.ID
            WHERE  estrategias.ID = ?;`,[estrategia_id])
            const estrategia = results[0];            
            if(!estrategia){
                return null;
            }

            return results;
        }catch(error){
            console.log(`Repository Error : ${error.message}`);
        }
    }

    
    async read(id_estrategia){
        try{
            const [results] = await conection.query('SELECT * FROM Estrategias WHERE ID = ? ',[id_estrategia]);
        
            const estrategia = results[0];
            if(!estrategia){
                return null;
            }else{
                return new Estrategias(estrategia.titulo_estrategia, estrategia.tipo_estrategia, estrategia.descricao_estrategia, estrategia.organizacao_id, estrategia.ID);
            }
        }catch(error){
            console.log(`Repository Error : ${error.message}`);
        }
    }

    async update(id_estrategia, estrategia){
        try{
            const [results] = await conection.query('UPDATE Estrategias SET titulo_estrategia =?, tipo_estrategia =?, descricao_estrategia =?, organizacao_id =? WHERE ID = ?',
            [estrategia.titulo_estrategia, estrategia.tipo_estrategia, estrategia.descricao_estrategia, estrategia.organizacao_id, id_estrategia]);

            if(results.affectedRows === 0){
                return null;
            }

        }catch(error){
            console.log(`Repository Error : ${error.message}`);
        }
    }


    async delete(id_estrategia){
        try{
            const [results] = await conection.query('DELETE FROM Estrategias WHERE ID = ?' ,[id_estrategia]);
            console.log(results[0])
            if(results.affectedRows === 0){
                return null;
            }
        }catch(error){
            console.log(`Repository Error : ${error.message}`);
        }
    }

}


export default EstrategiaRepository;