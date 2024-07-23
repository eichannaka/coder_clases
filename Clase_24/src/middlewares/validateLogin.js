export const validateLogin = (req, res, next) => {
    if (req.session?.info?.loggedIn) {
      next();
    } else {
      res.redirect("/views/login");
    }
  };
  
  export const isLoggedIn = (req, res, next) => {
    if (!req.session?.info?.loggedIn) {
      next(); // El usuario no está logueado, así que se permite continuar
    } else {
      res.redirect("/views/profile");
    }
  };
  