const {request,response} = require('express');
const User = require('../models/usuarios');
const {generarJWT} = require('../helpers/generarJWT')
const bcrypt = require('bcryptjs');

const login = async (req = request, res = response) => {

    const {correo, password} = req.body;

        try {
            const usuario = await User.findOne({correo})

            if(!usuario){
                return res.status(400).json({
                    msg:"El usuario / la contraseña incorrecto"
                })
            }

            if(!usuario.estado){
                return res.status(400).json({
                    msg:"El usuario fué eliminado"
                })
            }

            const validPassword = bcrypt.compareSync(password, usuario.password)

            if(!validPassword){
                return res.status(400).json({
                    msg:"El usuario / la contraseña incorrecto"
                })
            }
            const token = await generarJWT(usuario.id)
            
            res.json({
                usuario,
                token
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"Algo salió mal"
            })
        }
}

module.exports = {
    login
}