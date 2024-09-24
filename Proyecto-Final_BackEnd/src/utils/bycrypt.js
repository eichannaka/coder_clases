import bcrypt from "bcrypt";
export const hashData = async (password) => {
    return bcrypt.hash(password, 10);
  };
  
  export const compareData = async (password, passwordBD) => {
    return bcrypt.compare(password, passwordBD);
  };
  