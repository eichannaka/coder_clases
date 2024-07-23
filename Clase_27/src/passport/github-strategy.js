import * as services from '../services/user.services.js';
import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport'
//import 'dotenv/config';
import config from '../../envConfig.js'

const stratetyConfig = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: config.GITHUB_CALLBACK_URL
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) => {
    try {
        console.log('Github profile:', profile);
        const email = profile.emails?.[0]?.value || '';
        const first_name = profile._json.name.split(' ')[0] ?? '';
        const last_name = profile._json.name.split(' ').length === 3 ? profile._json.name.split(' ')[1].concat(' ', profile._json.name.split(' ')[2]) : profile._json.name.split(' ')[1];
    
        const user = await services.getByEmail(email);
        if(user) return done(null, user);

        const newUser = await services.register({ 
            email, 
            first_name, 
            last_name,
            password: ' ',
            image: profile._json.avatar_url,
            isGithub: true 
        });

        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
};

passport.use('github', new GithubStrategy(stratetyConfig, registerOrLogin));

passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await services.getById(id);
        return done(null, user);
    } catch (error) {
        done(error);
    }
});