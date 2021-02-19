
const {response} = require('express');


const usersGet = (req, res=response) => {
    
    const {q,nombre,apikey} = req.query;
    res.json({
        message: 'get API',
        q,
        nombre,
        apikey
    });
}

const usersPost = (req, res=response) => {
    
    const {nombre,edad} = req.body;

    res.json({
        message: 'post API',
        nombre,
        edad
    });
}

const usersPut =  (req, res=response) => {
    
    const id = req.params.id;

    res.json({
        message: 'put API',
        id
    });
}


const usersPatch = (req, res=response) => {
    res.json({
        message: 'patch API'
    });
}

const userDelete = (req, res=response) => {
    res.json({
        message: 'delete API'
    });
}

module.exports={
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    userDelete
}