const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).send({});
    }

    next();
})

// ROUTES

const userController = require('./user/controller/userController');

// endpoint do postman
app.use('./user', userController);

// rotas caso as acima nao sejam acessiveis
app.use(() => {
    const error = new Error('Não encontrado');
    error.status = 404;
    next(error);
})

app.use((error, res) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app;