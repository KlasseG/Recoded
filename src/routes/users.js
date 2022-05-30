const express= require('express');
const router= express.Router();
const User= require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res)=>{
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res)=>{
    res.render('users/signup');
});

router.post('/users/signup', async (req, res)=>{
    const { name, lname, email, password, confirm_password }=req.body; //desde el body hago un request de los datos
    const errors=[];    //Creo una variable de errores
    //bloque de validaciones
        //validaciones para asegurarse de que no están vacías
    if (name.length<=0) { 
        errors.push({text: 'Por favor inserta tu nombre'});
    }
    if (lname.length<=0) {
        errors.push({text: 'Por favor inserta tu apellido'});
    }
    if (email.length<=0) {
        errors.push({text: 'Por favor inserta tu email'});
    }
    if (password.length<=0) {
        errors.push({text: 'El campo contraseña esta vacío'});
    }
    if (confirm_password.length<=0) {
        errors.push({text: 'El campo confirmar contraseña está vacío'});
    }
    //si la contraseña es diferente de la confirmación falla
    //si no son diferentes pero son carácteres vacíos falla
    if (password != confirm_password && (password!==''&&confirm_password!=='')) {
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    //verifica que la contraseña sea mayor que cuatro
    if (password.length < 4) {
        errors.push({text: 'la contraseña debe ser mayor a cuatro carácteres'});
    }
    //compara la cantidad de errores validados y si es mayor que 0 manda a renderizar la página signup
    //al renderizar le pasa las variables errors, name, lname, email, password, confirm_password para que se reemplacen
    if (errors.length > 0) {
        res.render('users/signup', {errors, name, lname, email, password, confirm_password});
    }else{ //Si no... ps manda a decir que todo ta bien 👍
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'El email ya ha sido registrado');
            res.redirect('/users/signup'); 
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Has sido registrado');
        res.redirect('/users/signin');
    }
})

module.exports=router;