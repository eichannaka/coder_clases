import * as services from '../services/user.services.js';
import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport'
//import 'dotenv/config';
import config from '../../envConfig.js'

const stratetyConfig = {
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.GITHUB_CALLBACK_URL
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) => {
    try {
        console.log('Github profile:', profile);
        const email = profile._json.email ??  `${profile.username}@github.com`;

        const user = await services.getByEmail(email);
        if(user) return done(null, user);

        const first_name = profile._json.name;
        const last_name = " ";

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