const {Schema,model} = require('mongoose')

const RoleSchema = Schema({
   rol:{ 
    type:String,
    required:[true, 'el rol debe ser ingresado']
   }
})

module.exports = model('Role', RoleSchema)