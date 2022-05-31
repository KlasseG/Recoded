const express= require('express');
const async = require('hbs/lib/async');
const router= express.Router();

const Note= require ('../models/Note');
const { isAuthenticated }=require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res)=>{
    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res)=>{
    const {title, description}=req.body;
    const errors=[];
    if (!title) {
        errors.push({text: 'Por favor introduzca un Nombre para la materia'});
    }
    if (!description) {
        errors.push({text: 'Por favor introduzca una descripción'});
    }
    if (errors.length >0) {
        res.render('notes/new-note', {
            errors,
            title, 
            description
        });
    } else {
        const newNote= new Note({title, description});
        newNote.user=req.user.id;
        // console.log(newNote);
        await newNote.save();
        req.flash('success_msg', 'Clase agregada satisfactoriamente');
        res.redirect('/notes');
    }
});

router.get('/notes', isAuthenticated, async(req, res)=>{
    const notes=await Note.find({user: req.user.id}).sort({date: 'desc'});
    res.render('notes/all-notes', {notes});
})

router.get('/notes/edit/:id', isAuthenticated, async (req,res)=>{
    const note= await Note.findById(req.params.id);
    res.render('notes/edit-note', {note});
});

router.put('/notes/edit-note/:id', isAuthenticated, async(req, res)=>{
    const {title, description}=req.body;
    await Note.findByIdAndUpdate(req.params.id, {title,description});
    //function notificacionCorreo({ title,descripción}, {user.email});
    //user.email=>{Title,description} "Se ha modificado la clase {title} que tienes instrita"
    req.flash('sucess_msg', 'Clase actualizada Correctamente');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('sucess_msg', 'Clase eliminada Correctamente');
    res.redirect('/notes');
});

module.exports=router;