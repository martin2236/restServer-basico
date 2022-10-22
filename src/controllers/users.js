const {request,response} = require('express');
const User = require('../models/usuarios');
const bcrypt = require('bcryptjs');

const userGet = async (req = request, res = response)=> {
const{limit = 5, desde = 0} = req.query;
const query = {estado:true}
const limiteValido = Number(limit)
const desdeValido = Number(desde)
    if(isNaN(limiteValido) || isNaN(desdeValido)){
        res.status(400).json({
            msg:"limite y desde deben ser numeros"
        })
    }else{
        const [total, usuarios] = await Promise.all([
         await User.countDocuments(query),
         await User.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
        ])
        res.json({
            total,
            usuarios
        })
    }
}
const userPut = async(req, res)=> {
    let {id}= req.params;
    const {_id,password, google, correo, ...datosAModificar} = req.body

    if(password){
        const salt = bcrypt.genSaltSync();
        datosAModificar.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await User.findByIdAndUpdate(id,datosAModificar);
    res.json(usuario)
  }
const userPost = async (req, res)=> {
    const {nombre, correo, password, rol} = req.body;
    const user = new User({nombre, correo,password,rol});

    //1- verificar correo
    

    //2- encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    
    //3- guardar en la db
    user.save();
    res.json({
        msg:"post API",
        user
    })
  }
const userDelete = async (req, res)=> {
    const authUser = req.usuario
    const {id} = req.params
    const usuario = await User.findByIdAndUpdate(id,{estado:false})
    res.json({usuario, authUser})
  }

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete
}