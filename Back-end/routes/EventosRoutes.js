import express from 'express';
import EventoService from '../services/EventoService.js';

const evService = new EventoService();
const Router = express.Router();

Router.post('/insert', async(req,res)=>{
    const post_data = req.body;
    const {nome_evento, localizacao_evento, descricao_evento, data_evento, organizacao_id} = post_data;

    try{
        await evService.createEvento(nome_evento, localizacao_evento, descricao_evento, data_evento, organizacao_id);
        res.send({message:'Novo evento cadastrado com sucesso!!!'});
    }catch(error){
        res.status(500).send({error:`Erro : ${error.message}`});
    }
});

Router.get('/list', async(req,res)=>{
    try{
        const results = await evService.listEventos();
        res.send(results);
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`);
    }
});

Router.get('/list/:id_evento', async(req,res)=>{
    const id_evento = req.params.id_evento;
    try{
        const results = await evService.readEvento(id_evento);
        if(results === null){
            res.status(404).send('Erro : Evento não encontrado!');
        }else{
            res.send(results);
        }
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`);
    }
});


Router.put('/update/:id_evento', async(req,res)=>{
    const update_data = req.body;
    const id_evento = req.params.id_evento;
    const{ nome_evento, localizacao_evento, descricao_evento, data_evento, organizacao_id} = update_data;
    

    if(Object.keys(update_data).length === 0){
        res.status(422).send('Erro! Corpo da requisição vazio!');
        return;
    }
    
    try{
        const evento = await evService.readEvento(id_evento);

        if(evento === null){
            res.status(404).send('Error ! ID da organização inválido!');
        }else{
            const eventoUpdated = {...evento , ...update_data};

            await evService.updateEvento(id_evento,eventoUpdated);

            res.send('Evento atualizado com sucesso!');
        }
        
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`); 
    }
});



Router.delete('/delete/:id_evento', async(req,res)=>{
    const id_evento = req.params.id_evento;
    
    try{
        const results = await evService.deleteEvento(id_evento);
        if(results === null){
            res.status(404).send('Erro : ID do evento inválido!');
        }else{
            res.send('Evento deletado com sucesso!');
        }
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`); 
    }
});

export default Router;