const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes')

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.use((error, req, res, next) => {
    if (error.joi) { //if joi produces an error, it's likely a client-side problem   
        return res.status(400).json({
            error: error.joi.message
        });
    } //otherwise, it's probably a server-side problem.  
    return res.status(500).send(error)
});

module.exports = app;