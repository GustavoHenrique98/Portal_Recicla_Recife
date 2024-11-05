//Dependencias
import express from "express";
import cors from 'cors';
import morgan from "morgan";

//Rotas a partir do router
import Organizacao from "./routes/OrganizacaoRoutes.js";
import Estrategias from "./routes/EstrategiasRoutes.js";
import Eventos from "./routes/EventosRoutes.js";
import Paginas from "./routes/PaginasRoutes.js";

//Checando se a API está disponível
const app = express();
const API_AVAILABLE = true;

app.use((req,res,next)=>{
    if(API_AVAILABLE){
        next();
    }else{
        res.send('<h1>API em manutenção! Tente novamente mais tarde!</h1>');
    }
});

//Middlewares
app.use(cors());
app.use(morgan('URL: :url | Método: :method'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Utilizando as rotas.
app.use('/' , Paginas);
app.use('/api/organizacoes' , Organizacao);
app.use('/api/estrategias' , Estrategias);
app.use('/api/eventos' , Eventos);

//Caso a requisição seja para uma rota que não existe.
app.use((req,res)=>{
    res.status(404).send("<h1>ERRO 404! Rota não encontrada!!!</h1>");
});



//Abrindo server.
app.listen(3000,()=>{
    console.log('Servidor rodando em http://localhost:3000');
});