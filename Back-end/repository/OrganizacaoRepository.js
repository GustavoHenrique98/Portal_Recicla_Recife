import Organizacoes from '../entity/Organizacao.js'
import conection from '../database/db.js';

class OrganizacaoRepository{
    
    async create(organizacao){
        try{
            const [results] = await conection.query('INSERT INTO Organizacoes (cnpj, nome_fantasia, email, password, porte, telefone, localizacao_organizacao, responsavel_organizacao) VALUES(?,?,?,?,?,?,?,?)',
            [organizacao.cnpj , organizacao.nome_fantasia ,organizacao.email , organizacao.password, organizacao.porte, organizacao.telefone, organizacao.localizacao_organizacao,organizacao.responsavel_organizacao]);
            
        }catch(error){
            console.log(`Error : ${error.message}`);
        }
    }

    async list(){
        try{
            const [results] = await conection.query('SELECT * FROM Organizacoes')
            if(results.length === 0){
                return null;
            }
            
            return results;
            
        }catch(error){
            console.log(`Error : ${error.message}`);
        }
    }
    
    async read(id_organizacao){
        try{
            const [results] = await conection.query('SELECT * FROM Organizacoes WHERE ID = ?',[id_organizacao]);
            
            const organizacao = results[0];

            if(organizacao === undefined){
                return null;
            }else{
                return new Organizacoes(organizacao.cnpj, organizacao.nome_fantasia, organizacao.email, organizacao.password ,organizacao.porte, organizacao.telefone,
                    organizacao.localizacao_organizacao , organizacao.responsavel_organizacao , organizacao.ID);
            }
        }catch(error){
            console.log(`Error : ${error.message}`);
        }
    }

    async update(id_organizacao, organizacao){
        try{
            const [results] = await conection.query('UPDATE Organizacoes SET cnpj =? , nome_fantasia =? , email =? , password =?, porte =? , telefone =? , localizacao_organizacao =?, responsavel_organizacao =? WHERE ID = ?',
            [organizacao.cnpj , organizacao.nome_fantasia ,organizacao.email , organizacao.password, organizacao.porte, organizacao.telefone, organizacao.localizacao_organizacao, organizacao.responsavel_organizacao, id_organizacao]);

            if(results.affectedRows === 0){
                return null;
            }

        }catch(error){
            console.log(`Error : ${error.message}`)
        }
    }


    async delete(id_organizacao){
        try{
            const [results] = await conection.query('DELETE FROM Organizacoes WHERE ID = ?' ,[id_organizacao]);
            if(results.affectedRows === 0){
                return null;
            }
        }catch(error){
            console.log(`Error : ${error.message}`)
        }
    }



}





export default OrganizacaoRepository;