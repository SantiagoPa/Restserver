
const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (rol='') =>{
    const existRole = await Role.findOne({ rol });
    if (!existRole) {
        throw new Error(`El rol: ${ rol }, no esta registrado en la base de datos`);
    }
}

const isEmailValid = async (email='') =>{
    existEmail = await User.findOne({email});
    if( existEmail ){
        throw new Error(`El email: ${email}, ya esta registrado`);    
    }
}

const isUserValidById = async (id='') =>{
    existUser = await User.findById(id);
    if( !existUser ){
        throw new Error(`El ID: ${id}, No existe`);    
    }
}

module.exports = {
    isRoleValid,
    isEmailValid,
    isUserValidById
}