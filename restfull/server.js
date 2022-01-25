import express, { urlencoded, json } from 'express';
//import consign from 'consign';
import expressValidator from 'express-validator';

const app = express();

app.use(urlencoded({ extended: false }));
app.set("rotas")
app.use(json());
app.use(expressValidator());


//consign().include('rotas').include('utius').into(app)//pasta rotas

app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000...')
});


