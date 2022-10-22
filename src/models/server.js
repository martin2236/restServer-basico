const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const {dbConnection} = require('../database/config')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.userRoutes = "/api/users"
        this.authPath = "/api/auth"
        //coneccion a la DB
        this.conectarDb();
        //middleware
        this.middleware();
        //routes
        this.routes()
    }
    async conectarDb (){
        await dbConnection();
    }
    middleware(){
        //cors
        this.app.use(cors())
        // parse body data
        this.app.use(express.json())
        //public folder path
        this.app.use(express.static("src/public"))
        
    }

    routes(){
        this.app.use(this.authPath,require('../routes/auth'))
       this.app.use(this.userRoutes,require('../routes/user'))
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`http://localhost:${8080}`)
        })
    }
}

module.exports = Server