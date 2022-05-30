const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new localStrategy({ //de passport usa una estrategia local
    usernameField: 'email' //ocupamos el email
}, async (email, password, done) => { //trae el email el password y la función done
    const user = await User.findOne({
        email: 'email'
    }); //mando a buscar el email en la DB
    if (!user) { //si no está
        return done(null, false, {
            message: 'Usuario no encontrado'
        }); //regresa error
    } else { //caso contrario
        const match = await user.matchPassword(password); //valida si el que encontró tiene la contraseña ingresada
        if (match) { // si si
            return done(null, user); //todo bien 👍
        } else { //si no
            return done(null, false, {
                message: 'Contraseña incorrecta'
            }); //todo mal
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})