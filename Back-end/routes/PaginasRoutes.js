import express from 'express';
const Router = express.Router();
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

Router.use(express.static(path.join(__dirname, "../../Front-end/src/")));

//Página inicial.
Router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../../Front-end/src/pages/home/index.html'));
});

//Pagina de login.
Router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname, '../../Front-end/src/pages/login/index.html'));
});

//Página de cadastro.
Router.get('/cadastro',(req,res)=>{
    res.sendFile(path.join(__dirname, '../../Front-end/src/pages/cadastro/index.html'));
});

Router.get('/painel',(req,res)=>{
    res.sendFile(path.join(__dirname, '../../Front-end/src/pages/painel/index.html'));
});

Router.get('/painel/novo-evento',(req,res)=>{
    res.sendFile(path.join(__dirname, '../../Front-end/src/pages/novoEvento/index.html'));
});





export default Router;