const mongoose=require('mongoose'); //Traemos Mongoose para conectarse con la DB
const {Schema}=mongoose;    //de mongoose traemos schema
const bcrypt=require('bcryptjs'); //traemos el módulo bcrypt para el cifrado dinámico 
const async = require('hbs/lib/async'); //traemos async para hbs

const UserSchema= new Schema({  //definimos el esquéma y lo guaramos en UserSchema
    name: {type: String, required: true},   //nombre string requerido
    lname: {type: String, required: true, default: ''}, //apellido string requerido
    email: {type: String, required: true}, //email string requerido
    password: {type: String, required: true}, //password string requerido
    validador: {type: String, required: true, default: 'codigo'},// Función pendinete
    validado: {type: Boolean, required: true, default: false},
    profesor: {type: Boolean, required: true, default: false},
    date: {type: Date, default:Date.now} //fecha de creación tipo fecha automática
});

UserSchema.methods.encryptPassword= async (password)=>{ //Método de UserSchema para encriptar
    const salt= await bcrypt.genSalt(10);   //hacemos una variable que guarde el recultado de la funcion genSalt con una iteración de 10
    const hash=bcrypt.hash(password, salt); //hago una variable que va a generar con salt (semilla) y Password una encriptación de la contraseña
    return hash; //regresamos el resultado del proceso anterior
};

UserSchema.methods.matchPassword=async function(password){ //Método de UserSchema para comparar passwords
    return await bcrypt.compare(password, this.password); //Regresa una comparación de la contraseña guardada con la contraseña ingresada
};

module.exports=mongoose.model('User', UserSchema); //cuando escriba Us harás referencia a UserSchema;