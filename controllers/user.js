const {response} = require('express');
const bcryptjs   = require('bcryptjs');


const User = require('../models/user');


const usersGet = async (req, res=response) => {    
    
    const {limit=5, since=0 } = req.query;
    const query = {status: true};

    // manera optimizada
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(  Number(since) )
            .limit( Number(limit) )
    ]);

    res.json({
        total,
        users
    });
}

const usersPost = async(req, res=response) => {
    
    const {name, email, password, rol} = req.body;
    const user = new User({name, email, password, rol});
     
    // encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // guardar en DB
    await user.save();
    
    res.json({
        user
    });
}

const usersPut = async (req, res=response) => {
    
    const { id } = req.params;
    // extraemos los elementos que no queremos actualizar
    const { _id, password, google, email, ...result}  = req.body;
    
    if (password) {
        // encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        result.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, result );

    res.json(user);
}

const userDelete = async(req, res=response) => {
    
    const {id} = req.params;
    
    const user = await User.findByIdAndUpdate(id,{status:false});
    const userAthenticated = req.user

    res.json({user,userAthenticated});

}

const usersPatch = (req, res=response) => {
    res.json({
        message: 'patch API'
    });
}


module.exports={
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    userDelete
}