import passport from 'passport';
import { ExtractJwt, Strategy as jwtStrategy} from 'passport-jwt';
import * as services from '../services/user.services.js';
//import 'dotenv/config';
import config from '../../envConfig.js';

/* Con headers*/
// const strategyConfig = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.SECRET_KEY    
// };

// // req.user = jwt_payload

// const verifyToken = async (jwt_payload, done) => {
//     console.log('payload', jwt_payload);
//     const user = await services.getById(jwt_payload.userId);
//     if(!user) return done(null, false);
//     return done(null, user);
// };

// passport.use('jwt', new jwtStrategy(strategyConfig, verifyToken));


//----------------------------------------------------------------------------------------


/* Con cookies*/

const cookieExtractor = (req) => {
    const token = req.cookies.token;
    return token;
}

const strategyConfigCookies = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: config.SECRET_KEY    
};

const verifyTokenCookies = async (jwt_payload, done) => {
    console.log('payload', jwt_payload);
    const user = await services.getById(jwt_payload.userId);
    if(!user) return done(null, false);
    return done(null, user);
};


passport.use('jwtCookies', new jwtStrategy(strategyConfigCookies, verifyTokenCookies))

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
