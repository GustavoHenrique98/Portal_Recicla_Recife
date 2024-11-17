import express from 'express';
import EventoService from '../services/EventoService.js';

const evService = new EventoService();
const Router = express.Router();

Router.post('/insert', async(req, res) => {
    const post_data = req.body;
    const {nome_evento, localizacao_evento, descricao_evento, data_inicio_evento, data_final_evento, organizacao_id, estrategia_id} = post_data;
    
    try {
        
        await evService.createEvento(nome_evento, localizacao_evento, descricao_evento, data_inicio_evento, data_final_evento, organizacao_id,estrategia_id); 
        res.send({ message: 'Novo evento cadastrado com sucesso!!!' });
    } catch (error) {
        res.status(500).send({ message: `Erro : ${error.message}` });
        
    }
});

Router.get('/list', async(req,res)=>{
    try{
        const results = await evService.listEventos();
        res.send(results);
    }catch(error){
        res.status(500).send({message:`Erro : ${error.message}`});
    }
});

Router.get('/events-from-org/:organizacao_id', async(req,res)=>{
    const organizacao_id = req.params.organizacao_id;
    try{
        const results = await evService.listOrgEvents(organizacao_id);
        if(results === null){
            res.status(404).send([]);
        }else{
            res.send(results);
        }
    }catch(error){
        res.status(500).send({message:`Erro : ${error.message}`});
    }
});

Router.get('/all-events-from-orgs', async(req,res)=>{
    try{
        const results = await evService.listAllOrgEvts();
        if(results === null){
            res.status(404).send([]);
        }else{
            res.send(results);
        }
    }catch(error){
        res.status(500).send({message:`Erro : ${error.message}`});
    }
});

Router.get('/list/:id_evento', async(req,res)=>{
    const id_evento = req.params.id_evento;
    try{
        const results = await evService.readEvento(id_evento);
        if(results === null){
            res.status(404).send({message:'Erro : Evento não encontrado!'});
        }else{
            res.send(results);
        }
    }catch(error){
        res.status(500).send({message:`Erro : ${error.message}`});
    }
});


Router.put('/update/:id_evento', async(req,res)=>{
    const update_data = req.body;
    const id_evento = req.params.id_evento;
    const{ nome_evento, localizacao_evento, descricao_evento, data_inicio_evento, data_final_evento, estrategia_id} = update_data;
    

    if(Object.keys(update_data).length === 0){
        res.status(422).send({message:'Erro! Corpo da requisição vazio!'});
        return;
    }
    
    try{
        const evento = await evService.readEvento(id_evento);
        console.log(evento)
 
        if(evento === null){
            res.status(404).send({message : 'Error ! ID  do evento inválido!'});
        }else{
            const eventoUpdated = {...evento , ...update_data};

            await evService.updateEvento(id_evento,eventoUpdated);

            res.send({message:'Evento atualizado com sucesso!' });
        }
        
    }catch(error){
        res.status(500).send({message:`Erro : ${error.message}`}); 
    }
});



Router.delete('/delete/:id_evento', async(req,res)=>{
    const id_evento = req.params.id_evento;
    
    try{
        const results = await evService.deleteEvento(id_evento);
        if(results === null){
            res.status(404).send({message:'Erro : ID do evento inválido!'});
        }else{
            res.send({message:'Evento deletado com sucesso!'});
        }
    }catch(error){
        res.status(500).send({message : `Erro : ${error.message}`}); 
    }
});

export default Router;