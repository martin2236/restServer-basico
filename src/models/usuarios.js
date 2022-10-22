const {Schema, model} = require('mongoose')

const UserSchema = Schema({ 
    nombre:{
        type:String,
        required: [true,'el nombre es obligatorio'],
    },
    correo:{
        type:String,
        required: [true,'el correo es obligatorio'],
        unique:true,
    },
    password:{
        type:String,
        required:[true, 'envie un password']
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true,
    },
    google:{
        type:Boolean,
        default:false,
    }

})

UserSchema.methods.toJSON = function (){
    const {__v,password,_id,...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario
}

module.exports = model('User',UserSchema)