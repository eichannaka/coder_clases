import { Router } from "express";
import passport from "passport";
import {
  loginUser,
  logoutUser,
  loginUserGithub,
  registerUser,
  getCurrentUser,
  recoveryUser,
  setNewPass,
  setRole,
  getAllUsers,
  deleteUserInactive,
  deleteAnUser,
} from "../controller/user.controller.js";
const router = Router();

// Register Local passport
router.post(
  "/register",
  passport.authenticate("signIn", {
    session: false,
    passReqToCallback: true,
  }),
  registerUser
);
// Login Local passport
router.post(
  "/login",
  passport.authenticate("login", {
    passReqToCallback: true,
    session: false,
  }),
  loginUser
);
// LOGIN CON GITHUB
router.get(
  "/login/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);
router.get(
  "/github",
  passport.authenticate("github", { passReqToCallback: true, session: false }),
  loginUserGithub
);
router.get(
  "/current",
  passport.authenticate("jwtCookies", { session: false }),
  getCurrentUser
);
router.get("/", getAllUsers);
router.get("/recovery/:id", recoveryUser);
router.get("/logout", logoutUser);
router.post("/premium/:uid", setRole);
router.post("/setNewPass/:id", setNewPass);
router.delete("/", deleteUserInactive);
router.delete("/deleteUser/:uid", deleteAnUser);

export default router;
