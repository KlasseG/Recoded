const mongoose = require('mongoose'); //requerimos conectarnos a la DB
const{ Schema }=mongoose;   //creamos un esquema de datos para la DB

const NoteSchema= new Schema({ //creamos un esquéma llamado NoteSchema desde mongoose
    title: {type: String, required: true},  //titulo tipo string y es requerido
    description: {type: String, required: true}, // descripción tipo string y es requerido
    archived: {type: Boolean, default: false , required: true}, // Saber si esta la clase archivada, de base no, pero es requerido el dato
    date: {type: Date, default: Date.now} //fecha de inserción autogenerada
});

module.exports=mongoose.model('Note', NoteSchema) //declaramos que al usar Note hará referencia a NoteSchema