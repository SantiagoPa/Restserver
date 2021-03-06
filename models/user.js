const {Schema,model} = require('mongoose');

 const userSchema = Schema({
     name:{
         type: String,
         required: [true, 'El nombre es obligatorio']
     },
     email:{
         type: String,
         required: [true, 'El correo es obligatorio'],
         unique: true
     },
     password:{
         type: String,
         required:[true,'La contraseña es obligatoria']
     },
     img:{
         type: String
     },
     rol:{
         type: String,
         required: true,
        //  enum: ['ADMIN_ROLE','USER_ROLE'] como defini los roles en la db
        // ya esta linea no es necesario porque genera conflicto.
     },
     status:{
         type: Boolean,
         default: true
     },
     google:{
        type: Boolean,
        default: false
     }
 });


 // sacando el password y __v del post que devuelve.
 // es irrelevante al usurario mostrar eso
 userSchema.methods.toJSON = function(){
     const { __v, password, _id, ...user} = this.toObject();
     user.uid = _id;
     return user;
 } 

module.exports = model('User', userSchema);