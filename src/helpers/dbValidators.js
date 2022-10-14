const  Role  = require('../models/role');

const esRolValido = async(rol = '')=>{
    console.log('este es el rol que envio', rol)
    const existeRol = await Role.findOne({role:rol})
    if(!existeRol){
      throw new Error(`el rol ${rol} no esta registrado como válido`)
    }
}

module.exports = {
    esRolValido
}