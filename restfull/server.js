const express = require('express');
const consign = require('consign')
const expressValidator= require ('express-validator');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressValidator());


consign().include('rotas').include('utius').into(app)//pasta rotas

app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000...')
});


