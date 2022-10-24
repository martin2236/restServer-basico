const {request,response} = require('express');
const User = require('../models/usuarios');
const {generarJWT} = require('../helpers/generarJWT')
const bcrypt = require('bcryptjs');
const { googleVerify } = require('../helpers/googleVerify');

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

const googleSignIn = async (req = request, res = response)=>{
    const {id_token} = req.body;
    try {
        const {correo,nombre,img} = await googleVerify(id_token)

        let usuario = await User.findOne({correo});

        if(!usuario){
            const data ={
                nombre,
                correo,
                img,
                rol:"USER_ROLE",
                password:"=p",
                google:true
            }
            usuario = new User(data);
            await usuario.save();
        }

        if(!usuario.estado){
            return res.status(401).json("usuario bloqueado")
        }

        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg:"El token no se pudo verificar"
        })
    }
}

module.exports = {
    login,
    googleSignIn
}