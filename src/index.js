const express= require('express');  //requerimos express
//inicializaciones
require('./database'); //traemos el db.js
const app = express(); //iniciamos express

const passport= require('passport');
require('./config/passport');

const path= require('path'); //requerimos el path
const methodOverride= require('method-override'); //method override para formularios
const session= require('express-session');  //express session para generar sesiones separadas
const exphbs= require('express-handlebars'); //handlebars para configurar el front con plantillas
const flash=require('connect-flash');

const index = require('./routes/index'); //traemos el archivo de carpeta/routes/index
const notes = require('./routes/notes'); //traemos el archivo de carpeta/routes/notes
const users = require('./routes/users'); //traemos el archivo de carpeta/routes/users


//configuración
app.set('port', process.env.PORT || 3000); //conectamos en el puerto disponible al entorno y si no hay en el 3000
app.set('views', path.join(__dirname, 'views')); //establecemos la carpeta donde va a estar todo nuestro front
app.set('.hbs', exphbs.engine({     //iniciamos la aplicación con el layout default como main.hbs
    defaultLayout: 'main',      //donde está el layout
    layoutsDir: path.join(app.get('views'), 'layouts'),     //donde estarán los demás
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs' //nombre o tipo de la extención
}));
app.set('view engine', '.hbs'); //lanzamos
//Funciones pre server o middlewares
app.use(express.urlencoded({extended: false})) 
app.use(methodOverride('_method'));
app.use(session({
    secret: 'Bren',
    resave: true,
    saveUninitialized: true
})); 


app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
//Variables Globales
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    res.locals.user= req.user||null;
    next();
});
//Rutas o URLS
app.use(index);
app.use(notes);
app.use(users);
//Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
//Servidor
app.listen(app.get('port'), () =>{ //conexión con MongoDB
    console.log('Servidor en el puerto', app.get('port'));
});