import passport from 'passport';
//import * as controllers from '../controllers/user.controllers.js'
import * as services from '../services/user.services.js';
import { Strategy as LocalStrategy } from 'passport-local'; 
import { isValidPassword } from '../utils.js';

const strategyConfig = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

const register = async (req, email, password, done) => {
    try {
        const user = await services.getByEmail(email);
        if(user) return done(null, false, { msg: 'User already exists'});

        const newUser = await services.register(req.body);
        return done(null, newUser);
    } catch (error) {
        console.log(error);
        return done(null, false);
    }
};

const login = async (req, email, password, done) => {
    try {
        const user = await services.login( email );
        if(!user) return done(null, false, { msg: 'Invalid email or password' });

        if(!isValidPassword(password, user.password)){
            return done(null, false, { msg: 'Invalid password' });
        }

        return done(null, user);
    } catch (error) {
        return done(error)
    }
    
};

const registerStrategy = new LocalStrategy(strategyConfig, register);
const loginStrategy = new LocalStrategy(strategyConfig, login);

passport.use('login', loginStrategy);  //Usamos passport.use para que passport use este strategy en el login1
passport.use('register', registerStrategy);

//Recibe user y se queda con el id
//req.session.passport.user = 'asdfa3q43545df' --> el id de mongo
passport.serializeUser((user, done) => {
    done(null, user._id)
});

//Busca el user por id y devuelve toda la informacion
passport.deserializeUser(async(id, done) => {
    try {
        const user = await services.getById(id);
        return done(null, user);
    } catch (error) {
        done(error);
    }
});

