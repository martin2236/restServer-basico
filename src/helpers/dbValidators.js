const  Role  = require('../models/role');
const User = require('../models/usuarios')

const esRolValido = async(rol = '')=>{
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
      throw new Error(`el rol ${rol} no esta registrado como válido`)
    }
}

const esEmailUnico = async(correo) =>{
  const emailYaExiste = await User.findOne({correo})
    if(emailYaExiste){
        throw new Error(`el correo ${correo}  ya encuentra registrado`)
    }
}

const esUnUsuarioRegistrado = async(id) =>{
  const UsuarioExiste = await User.findById(id)
    if(!UsuarioExiste){
        throw new Error(`el id ${id} no pertenece a ningun usuario`)
    }
}

module.exports = {
    esRolValido,
    esEmailUnico,
    esUnUsuarioRegistrado
}