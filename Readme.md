# KlasseG APP
Una app para organizar todos tus enlaces a videoconferencias escolares
<hr>
KlasseG es una WebApp que prioriza la interacción con el usuario y su facilidad de uso

<hr>

## Codificado con:

### Vista
- Html 5 / CSS 3 / Javascript ECM6
### Modelo
- NodeJS
    - Express
        - Session
        - Handlebars
    - Method Override
    - Mongoose
    - Passport
    - Bcrypt
    - Connect Flash
    - Nodemon (Se recomienda instalar con el comando npm i -G nodemon)
### Controlador
- MongoDB

## Usarse en una versión local:

### Requerimientos:
- Node Instalado en el ordenador
- MongoDB instalado en el ordenador de pruebas y en el servidor
- 

### ¿Cómo arrancar el proyecto?

1. Abra una terminal en la carpeta KlasseG 
2. Ejecute el comando:

        node src/index

3. Si tiene instalado nodemon de forma general (Es decir ejecutó el comando "npm i -G nodemon") escriba el comando:

        nodemon src/index

4. Ingresar a la web [http://localhost:3000/](http://localhost:3000/)

5. iniciar el servidor de MongoDB con el comando:

        mongod

## Paso de desarollo actual

- Configuración del servidor Listo
- Conexión con la base de datos Listo
- Configuración de las vistas de HTML dentro de las rutas del servidor Listo
- Configuración de la entrada y salida de los datos desde la vista hacia el controlador Listo
- CRUD Listo
- sign up listo
- log in passport y express sessions listos
- validación de rutas codificandose


## Entendiendo el código para principiantes:

        router.get('/users/signup', (req, res)=>{
        res.render('users/signup');
        });

En pocas palabras:

        enruta.cuandoSeVisite('dirección', (mediante la petición regresa una respuesta) =>y vas a hacer:{
                regresa.renderizaciónDe('Archivo');
        });

Otro ejemplo:

        const UserSchema= new Schema({  //definimos el esquéma y lo guaramos en UserSchema
                name: {type: String, required: true},   //nombre string requerido
        });

En pocas palabras:

        enUnaVariableDe Nombre = hazUnNuevoObjeto Schema({
                nombreDeLaPropiedad: {tipoDeDato: keyword, propiedades: valor}
        });

Otro ejemplo:

        passport.use(new localStrategy({ //de passport usa una estrategia local
                usernameField: 'email' //ocupamos el email
        },async (email, password, done) =>{ //trae el email el password y la función done
                const user = await User.findOne({email: 'email'}); //mando a buscar el email en la DB
                if (!user) { //si no está
                return done(null, false, {message: 'Usuario no encontrado'}); //regresa error
                } else { //caso contrario
                const match = await user.matchPassword(password); //valida si el que encontró tiene la contraseña ingresada
                if (match) {// si si
                        return done(null, user);//todo bien 👍
                } else { //si no
                        return done(null, false, {message: 'Contraseña incorrecta'}); //todo mal
                }
                }
        }));