const bcrypt = require('bcrypt');
const saltRounds = 10;

export const encryptPassword = (password: string) => {
    return bcrypt.hash(password, saltRounds);
};

export const isPasswordMatch = (password:string, hash: string) => {
    return bcrypt.compare(password, hash);
};

