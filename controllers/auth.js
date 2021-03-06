const {response} = require('express');
const bcryotjs   = require('bcryptjs'); 

const    User    = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async(req, res=response) =>{
    
    const {email,password} = req.body;
    try {
        //verificar el email existe
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario y/ o Correo no son validos -email'
            });
        }
        //verificar si el usuario existe en la db
        if (!user.status) {
            return res.status(400).json({
                msg: 'Usuario y/ o Correo no son validos -Estado: false'
            });
        }
        //verificar la contraseña
        const validPassword = bcryotjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario y/ o Correo no son validos -password'
            });
        }
        
        //generar el JWT (Json Web Token)
        const token = await generateJWT(user.id);


        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo ha salido mal, hable con el administrador'
        });
    }
    
}

module.exports = {
    login
}