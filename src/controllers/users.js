const {request,response} = require('express');

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
const userPost = (req, res)=> {
    const {id,nombre,edad} = req.body;

    res.json({
        msg:"post API",
        id,
        nombre,
        edad
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