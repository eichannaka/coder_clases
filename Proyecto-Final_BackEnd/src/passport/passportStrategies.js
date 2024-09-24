import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import UserManager from "../persistencia/DAOs/usersDAO/UsersMongo.js";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { Strategy as GithubStrategy } from "passport-github2";
import { hashData, compareData } from "../utils/bycrypt.js";
import { userModel } from "../persistencia/mongoDB/models/user.model.js";

const userManager = new UserManager();
const jwtSecret = process.env.SECRET_JWT;
const client_id = process.env.CLIENT_ID_GITHUB;
const client_secret = process.env.CLIENT_SECRET_GITHUB;

// Register Local Strategy
passport.use(
  "signIn",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userDB = await userManager.getUserByEmail(email);
        if (userDB) {
          const message = "Ya existe un usuario con ese email";
          return done(message, false); // ya existe el user se tendria que loguear
        }
        const hashPassword = await hashData(password);
        const newUser = {
          ...req.body,
          password: hashPassword,
        };
        console.log(newUser);
        const newUserDB = await userManager.createUser(newUser);
        done(null, newUserDB);
      } catch (error) {
        done(error);
      }
    }
  )
);
// Login Local Strategy
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userDB = await userManager.getUserByEmail(email);
        if (!userDB) {
          const message = "No existe un usuario con ese email";
          return done(message, false); // No existe en la database hay que registrarse
        }
        const comparePassword = await compareData(password, userDB.password);
        if (!comparePassword) {
          const message = "El password es incorrecto";
          return done(message, false); // los password no son iguales
        }
        userDB.ultimaActividad = new Date();
        userDB.save();
        done(null, userDB);
      } catch (error) {
        done(error);
      }
    }
  )
);
// GITHUB STRATEGY
passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL:
        "https://e-commercecoderhouse-production.up.railway.app/api/auth/github/",
    },
    async (accessToken, refreshToken, profile, done) => {
      const userDB = await userModel.findOne({ email: profile._json.email });
      if (!userDB) {
        const gitUser = {
          firstName: profile._json.name.split(" ")[0],
          lastName: profile._json.name.split(" ")[1] || " ",
          email: profile._json.email || " ",
          password: " ",
          isGithub: true,
        };
        const newUser = await userModel.create(gitUser);
        done(null, newUser);
      } else {
        done(null, userDB);
      }
    }
  )
);
const extactFromCookie = (req) => {
  let token = null;
  if (req && req.signedCookies) token = req.signedCookies["token"];
  console.log(token);
  return token;
};
// Recupera los datos de jwt
passport.use(
  "jwtCookies",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([extactFromCookie]),
      secretOrKey: jwtSecret,
    },
    async (jwt_payload, done) => {
      done(null, jwt_payload.user);
    }
  )
);

// Funciones obligatorias para que passport pueda encontrar y autenticar el user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});
