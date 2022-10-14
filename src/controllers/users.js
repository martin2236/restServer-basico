const {request,response} = require('express');
const User = require('../models/usuarios');
const bcrypt = require('bcryptjs');

const userGet = (req = request, res = response)=> {
    let {q,usuario,apiKey,page = 1,limit = 10} = req.query;
    console.log(q)
    res.json({
        msg:"get API - controlador",
        q,
        usuario,
        apiKey,
        page,
        limit
    })
}
const userPut = (req, res)=> {
    let id = req.params.id;
    res.json({
        msg:"put API - controller",
        id
    })
  }
const userPost = async (req, res)=> {
    const {nombre, correo, password, rol} = req.body;
    const user = new User({nombre, correo,password,rol});
    
    //1- verificar correo
    const emailYaExiste = await User.findOne({correo})
    if(emailYaExiste){
        return res.status(400).json({
            msg:"el correo ya existe"
        })
    }
    //2- encriptar password
    const salt = bcrypt.genSalt();
    user.password = bcrypt.hash(password, salt);
    
    //3- guardar en la db
    user.save();
    res.json({
        msg:"post API",
        user
    })
  }
const userDelete = (req, res)=> {
    res.json({
        msg:"delete API"
    })
  }

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete
}