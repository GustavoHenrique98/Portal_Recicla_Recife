import express from 'express';
import EstrategiaService from '../services/EstrategiaService.js';

const estService = new EstrategiaService();
const Router = express.Router();

Router.post('/insert', async(req,res)=>{
    const post_data = req.body;
    const {titulo_estrategia, tipo_estrategia, descricao_estrategia, organizacao_id} = post_data;

    if(Object.keys(post_data).length===0){
        res.status(422).send('Erro : Corpo da requisição vazio!');
        return;
    }

    if(!titulo_estrategia || !tipo_estrategia || !descricao_estrategia || !organizacao_id ){
        res.status(422).send('Erro! Dados incompletos preencha todos os campos! ');
        return;
    }

    try{
        await estService.createEstrategia(titulo_estrategia, tipo_estrategia, descricao_estrategia, organizacao_id);
        res.send('Nova estratégia cadastrada com sucesso!!!');
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`);
    }
});

Router.get('/list', async(req,res)=>{
    try{
        const results = await estService.listEstrategias();
        res.send(results);
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`);
    }
});


Router.get('/list/:id_estrategia', async(req,res)=>{
    const id_estrategia = req.params.id_estrategia;
    try{
        const results = await estService.readEstrategia(id_estrategia);
        if(results === null){
            res.status(404).send('Erro : Estratégia não encontrada!');
        }else{
            res.send(results);
        }
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`);
    }
});

Router.get('/list/estrategies-from-orgs/:organizacao_id',async(req,res)=>{
    const organizacao_id = req.params.organizacao_id;
    try{
        const results = await estService.listOrgEstrategies(organizacao_id);
        if(results === null){
            res.status(404).send(`Erro : nenhuma estratégia cadastrada por este organização!`);
        }else{
            res.send(results);
        }
    }catch(error){

    }
})


Router.put('/update/:id_estrategia', async(req,res)=>{
    const update_data = req.body;
    const id_estrategia = req.params.id_estrategia;
    const{titulo_estrategia, tipo_estrategia, descricao_estrategia, organizacao_id} = update_data;
    

    if(Object.keys(update_data).length === 0){
        res.status(422).send('Erro! Corpo da requisição vazio!');
        return;
    }
    
    try{
        const estrategia = await estService.readEstrategia(id_estrategia);

        if(estrategia === null){
            res.status(404).send('Error ! ID da estratégia inválido!');
        }else{
            const estrategiaUpdated = {...estrategia, ...update_data};
            

            await estService.updateEstrategia(id_estrategia,estrategiaUpdated);

            res.send('Estratégia atualizada com sucesso!');
        }
        
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`); 
    }
});



Router.delete('/delete/:id_estrategia', async(req,res)=>{
    const id_estrategia = req.params.id_estrategia;
    
    try{
        const results = await estService.deleteEstrategia(id_estrategia);
        if(results === null){
            res.status(404).send('Erro : ID da estratégia inválido!');
        }else{
            res.send('Estratégia deletada com sucesso!');
        }
    }catch(error){
        res.status(500).send(`Erro : ${error.message}`); 
    }
});




export default Router;